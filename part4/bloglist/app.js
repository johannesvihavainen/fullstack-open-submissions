require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const { tokenExtractor } = require('./utils/middleware')
const loginRouter = require('./controllers/login')


mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app