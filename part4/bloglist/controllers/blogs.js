const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

router.post('/', async (request, response) => {

    const { title, url, author, likes } = request.body

    if (!title || !url) {
        return response.status(400).json({ error: 'the title and url are required in a blog post' })
    }

    const blog = new Blog(request.body)

    const saveBlog = await blog.save()
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

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {likes}, {new: true, runValidators: true})
    
    if(updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = router

