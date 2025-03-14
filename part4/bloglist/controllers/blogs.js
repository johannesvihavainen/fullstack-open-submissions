const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

router.post('/', async (request, response) => {

    const { title, url, author, likes } = request.body

    const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'token is missing' })
    }

    let secretToken
    try {
        secretToken = jwt.verify(token, process.env.SECRET)
    } catch {
        return response.status(401).json({ error: 'invalid token' })
    }

    if (!secretToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(secretToken.id)

    if (!title || !url) {
        return response.status(400).json({ error: 'the title and url are required in a blog post' })
    }




    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user._id
    })

    const saveBlog = await blog.save()
    user.blogs = user.blogs.concat(saveBlog._id)
    response.status(201).json(saveBlog)
})

router.delete('/:id', async (request, response) => {
    const token = request.token

    if (!token) {
        return response.status(401).json({ error: 'the token is missing' })
    }

    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch {
        return response.status(401).json({ error: 'invalid token' })
    }

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const userId = decodedToken.id
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== userId.toString()) {
        return response.status(403).json({ error: 'error, only the creator is able to delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

router.put('/:id', async (request, response) => {
    const { likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = router

