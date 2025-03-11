process.env.NODE_ENV = 'test'
console.log('NODE_ENV:', process.env.NODE_ENV)
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert/strict')

const api = supertest(app)

// test('blogs are returned as json and contain the right amount of blog posts', async () => {

//   const blogsAtStart = await Blog.find({})

//   const response = await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   console.log(response.body)

//   assert.strictEqual(response.body.length, blogsAtStart.length)
// })

// test('blog posts contain id field instead of being _id', async () => {
//   const response = await api.get('/api/blogs')

//   console.log('logging response body');

//   console.log(response.body[0]);



//   response.body.forEach(blog => {
//     assert.ok(blog.id, 'expected blog to contain an id property')
//     assert.strictEqual(typeof blog.id, 'string', 'id should be a string')
//     assert.strictEqual(blog._id, undefined, '_id should not exist')
//   });


//   console.log(response.body)
// })


// test('a valid blog post can be added ', async () => {

//   const blogsAtStart = await Blog.find({})

//   const newBlogPost = {
//     title: "Do the hard work especially when you don't feel like it.",
//     author: "someone from somewhere once upon a time",
//     url: "nolinktoanywhere.com",
//     likes: 999999999
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlogPost)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)


//   const blogsAtEnd = await Blog.find({})

//   assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

//   const blogs = blogsAtEnd.map(blog => blog.title)
//   assert.ok(blogs.includes(newBlogPost.title), 'the new blog was not saved in the right way')
// })


// test('if the likes is missing, then likes will default to 0', async () => {
//   const newBlogPost = {
//     title: "a blog post without likes",
//     author: "some random guy",
//     url: "nolinktoanywhere.com",
//   }


//   const response = await api
//     .post('/api/blogs')
//     .send(newBlogPost)
//     .expect(201)

//   const allBlogs = response.body

//   assert.strictEqual(allBlogs.likes, 0, 'likes should be defaulting to 0 if they are missing')
// })

// test('blog post without a title will not be added', async () => {
//   const newBlogPost = {
//     author: "someone from somewhere once upon a time",
//     url: "nolinktoanywhere.com",
//     likes: 10
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlogPost)
//     .expect(400)
// })

// test('blog post without a url will not be added', async () => {
//   const newBlogPost = {
//     title: 'author from testingland',
//     author: "someone from somewhere once upon a time",
//     likes: 10
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlogPost)
//     .expect(400)
// })

const initialBlogsToUpload = [
  {
    title: 'a test blog',
    author: 'an unknown person',
    url: 'somewhereintheuniverse.com',
    likes: 10
  },
  {
    title: 'a second test blog',
    author: 'an unknown human being',
    url: 'somewhereintheuniverse.com',
    likes: 20
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogsToUpload)
})

test('update the likes in a blog post', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  const updatedData = {
    likes: blogToUpdate.likes + 200
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 200)

  const updatedBlog = await Blog.findById(blogToUpdate.id)
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 200)
})


// test('deletion of a blog post', async () => {
//   const blogsAtStart = await Blog.find({})
//   console.log(blogsAtStart);

//   const blogToDelete = blogsAtStart[0]

//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     .expect(204)

//   const blogsAtEnd = await Blog.find({})

//   assert.strictEqual(blogsAtEnd.length, initialBlogsToUpload.length - 1)

//   const ids = blogsAtEnd.map(blog => blog.id)
//   assert(!ids.includes(blogToDelete.id))
// })


after(async () => {
  await mongoose.connection.close()
})