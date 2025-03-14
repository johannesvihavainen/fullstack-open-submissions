const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

router.post('/', async (request, response) => {

    const { title, url, author, likes, userId } = request.body

    if (!title || !url) {
        return response.status(400).json({ error: 'the title and url are required in a blog post' })
    }

    const user = await User.findById(userId)

    if (!user) {
        return response.status(400).json({ error: 'no users found in the database' })
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
    await user.save()
    response.status(201).json(saveBlog)
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        response.status(400).json({ error: 'invalid id' })
    }
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

