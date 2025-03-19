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
    const user = request.user

    const token = request.token
    if (!user) {
        return response.status(401).json({ error: 'user is missing' })
    }

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
    await user.save()

    const populateBlog = await Blog.findById(saveBlog._id).populate('user', { username: 1, name: 1 })
    response.status(201).json(populateBlog)
})

router.delete('/:id', async (request, response) => {
    const user = request.user

    const token = request.token

    if (!user) {
        return response.status(401).json({ error: 'user was not found' })
    }
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'the blog could not be found' })
    }


    if (blog.user.toString() !== user._id.toString()) {
        return response.status(403).json({ error: 'error, only the creator is able to delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

router.put('/:id', async (request, response) => {
    const { likes } = request.body

    const blogToUpdate = await Blog.findById(request.params.id)
    if (!blogToUpdate) {
        return response.status(404).json({ error: 'blog was not found' })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes, user: blogToUpdate.user }, { new: true, runValidators: true }).populate('user', { username: 1, name: 1 })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = router

