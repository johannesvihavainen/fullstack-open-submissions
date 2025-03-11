const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

router.get('/', async (request, response) => {
const blogs = await Blog.find({})
response.json(blogs)
})

router.post('/', async (request, response) => {

    const {title, url, author, likes} = request.body
    
    if(!title || !url) {
        return response.status(400).json({error: 'the title and url are required in a blog post'})
    }
    
    const blog = new Blog(request.body)

    const saveBlog = await blog.save()
    response.status(201).json(saveBlog)
})

module.exports = router

