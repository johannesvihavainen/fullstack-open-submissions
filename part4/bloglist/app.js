require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const { tokenExtractor, userExtractor } = require('./utils/middleware')
const loginRouter = require('./controllers/login')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${config.MONGODB_URI}`)
  })
  .catch(error => {
    console.error('Error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/api/login', loginRouter)

app.use('/api/blogs', userExtractor, blogsRouter)

app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }


module.exports = app