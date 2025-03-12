const mongoose = require('mongoose')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const assert = require('node:assert/strict')

const api = supertest(app)

describe('when user does not have valid username or password or if missing', () => {
    beforeEach(async () => {
        await User.deleteMany({}) // Clear users before each test

        const passwordHash = await bcrypt.hash('securepass', 10)
        const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
        await user.save()
    })





    test('fails if username is too short', async () => {
        const newUser = { username: 'li', name: 'short name', password: 'securepass' }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(response.status, 400)
        assert(response.body.error.includes('username must be 3 characters long or more'))
    })

    test('fails if password is too short', async () => {
        const newUser = { username: 'validuser', name: 'valid user', password: '20' }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(response.status, 400)
        assert(response.body.error.includes('password must be 3 characters long or more'))
    })

    test('fails if missing username', async () => {
        const newUser = { name: 'no username', password: 'securepass' }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(response.status, 400)
        assert(response.body.error.includes('username must be 3 characters long or more'))
    })

    test('fails if missing password', async () => {
        const newUser = { username: 'nopassword', name: 'no password' }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(response.status, 400)
        assert(response.body.error.includes('password must be 3 characters long or more'))
    })

})

after(async () => {
    await mongoose.connection.close()
})