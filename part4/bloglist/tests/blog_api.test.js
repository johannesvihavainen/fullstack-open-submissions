process.env.NODE_ENV = 'test'
console.log('NODE_ENV:', process.env.NODE_ENV)
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

test('blog posts contain id field instead of being _id', async () => {
  const response = await api.get('/api/blogs')

  console.log('logging response body');

  console.log(response.body[0]);



  response.body.forEach(blog => {
    assert.ok(blog.id, 'expected blog to contain an id property')
    assert.strictEqual(typeof blog.id, 'string', 'id should be a string')
    assert.strictEqual(blog._id, undefined, '_id should not exist')
  });


  console.log(response.body)
})


after(async () => {
  await mongoose.connection.close()
})