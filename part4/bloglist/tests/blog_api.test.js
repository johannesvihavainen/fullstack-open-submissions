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


test('a valid blog post can be added ', async () => {

  const blogsAtStart = await Blog.find({})

  const newBlogPost = {
    title: "Do the hard work especially when you don't feel like it.",
    author: "someone from somewhere once upon a time",
    url: "nolinktoanywhere.com",
    likes: 999999999
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await Blog.find({})

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

  const blogs = blogsAtEnd.map(blog => blog.title)
  assert.ok(blogs.includes(newBlogPost.title), 'the new blog was not saved in the right way')
})


test('if the likes is missing, then likes will default to 0', async () => {
  const newBlogPost = {
    title: "a blog post without likes",
    author: "some random guy",
    url: "nolinktoanywhere.com",
  }


  const response = await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)

  const allBlogs = response.body

  assert.strictEqual(allBlogs.likes, 0, 'likes should be defaulting to 0 if they are missing')
})

after(async () => {
  await mongoose.connection.close()
})