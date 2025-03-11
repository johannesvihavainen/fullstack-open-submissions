const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert/strict')

const api = supertest(app)

test('blogs are returned as json and contain the right amount of blog posts', async () => {

  const blogsAtStart = await Blog.find({})

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log(response.body)

  assert.strictEqual(response.body.length, blogsAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
})