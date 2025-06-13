require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI

async function run() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    const username = 'testuser'
    const name = 'Test User'
    const password = 'testpassword'

    // Delete existing user with same username if any
    await User.deleteMany({ username })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username, name, passwordHash })

    const savedUser = await user.save()
    console.log('User saved:', savedUser)

    // Try to find the user and verify password
    const foundUser = await User.findOne({ username })
    const passwordCorrect = await bcrypt.compare(password, foundUser.passwordHash)

    console.log('Password correct?', passwordCorrect)

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.connection.close()
    console.log('Connection closed')
  }
}

run()
