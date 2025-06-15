const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await new Promise((res) => setTimeout(res, 500))

        const newUser = {
            username: 'johannes',
            name: 'Johannes Vihavainen',
            password: 'password123'
        }

        const res = await request.post('http://localhost:3001/api/users', { data: newUser })
        console.log('User create status:', res.status())
        console.log('User create body:', await res.json())


        const users = await request.get('http://localhost:3001/api/users')
        console.log('Users in DB:', await users.json())

        await new Promise((res) => setTimeout(res, 300))

        await page.goto('http://localhost:5173/')

    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })


    test.describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await new Promise(res => setTimeout(res, 500))
            await page.getByTestId('username').fill('johannes')
            await page.getByTestId('password').fill('password123')
            await page.getByRole('button', { name: 'Login' }).click()

            await expect(page.getByRole('button', { name: 'Create new blog' })).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('testuser')
            await page.getByTestId('password').fill('wrongpassword')
            await page.getByRole('button', { name: 'Login' }).click()

            const errorMessage = page.getByText('Sorry to have to let you know this, but you just do not have the valid credentials.')
            await expect(errorMessage).toBeVisible()
        })
    })

    describe('When logged in', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('http://localhost:5173/')

            await page.getByTestId('username').fill('johannes')
            await page.getByTestId('password').fill('password123')
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create new blog' }).click()

            await page.getByTestId('title-input').fill('test blog')
            await page.getByTestId('author-input').fill('an unknown author')
            await page.getByTestId('url-input').fill('unknownauthors.com')

            await page.getByRole('button', { name: 'create' }).click()

            await expect(page.getByText('test blog an unknown author')).toBeVisible()
        })
    })

    test('a blog can be liked', async ({ page }) => {
        await new Promise(res => setTimeout(res, 500))
        await page.getByTestId('username').fill('johannes')
        await page.getByTestId('password').fill('password123')
        await page.getByRole('button', { name: 'Login' }).click()

        await page.getByRole('button', { name: 'Create new blog' }).click()

        await page.getByTestId('title-input').fill('test blog')
        await page.getByTestId('author-input').fill('an unknown author')
        await page.getByTestId('url-input').fill('unknownauthors.com')

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('test blog an unknown author')).toBeVisible()

        await new Promise((res) => setTimeout(res, 300))

        await page.getByRole('button', { name: /view/i }).click()

        const likeButton = await page.getByRole('button', { name: /like/i })
        await likeButton.click()

        const likeText = await page.getByText(/likes \d+/i)
        await expect(likeText).toBeVisible()
    })

    test('a user who created a blog can delete it', async ({ page }) => {
        await new Promise(res => setTimeout(res, 500))
        await page.getByTestId('username').fill('johannes')
        await page.getByTestId('password').fill('password123')
        await page.getByRole('button', { name: 'Login' }).click()

        await page.getByRole('button', { name: 'Create new blog' }).click()

        await page.getByTestId('title-input').fill('test blog')
        await page.getByTestId('author-input').fill('an unknown author')
        await page.getByTestId('url-input').fill('unknownauthors.com')

        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('test blog an unknown author')).toBeVisible()

        await new Promise((res) => setTimeout(res, 300))

        await page.getByRole('button', { name: /view/i }).click()

        await page.getByRole('button', { name: 'delete' }).click()

        await expect(page.getByText('blog to be deleted')).toHaveCount(0)
    })

    test.describe('Blog delete button visibility', () => {
        test.beforeEach(async ({ page, request }) => {
            await request.post('http://localhost:3001/api/testing/reset')

            await request.post('http://localhost:3001/api/users', {
                data: { username: 'owner', name: 'Owner', password: 'secretpassword1' }
            })
            await request.post('http://localhost:3001/api/users', {
                data: { username: 'user2', name: 'User 2', password: 'secretpassword2' }
            })

            const loginResponse = await request.post('http://localhost:3001/api/login', {
                data: { username: 'owner', password: 'secretpassword1' }
            })

            const ownerToken = (await loginResponse.json()).token

            await request.post('http://localhost:3001/api/blogs', {
                data: {
                    title: 'a blog by',
                    author: 'the owner',
                    url: 'example.com'
                },
                headers: {
                    Authorization: `Bearer ${ownerToken}`
                }
            })
        })

        test('delete button visible only to blog owner', async ({ page }) => {
            await page.goto('http://localhost:5173')
            await new Promise(res => setTimeout(res, 500))
            await page.getByTestId('username').fill('owner')
            await page.getByTestId('password').fill('secretpassword1')
            await page.getByRole('button', { name: 'Login' }).click()

            await page.getByText('a blog by the owner').getByRole('button', { name: 'view' }).click()

            await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

            await page.getByRole('button', { name: 'log out' }).click()

            await page.getByTestId('username').fill('user2')
            await page.getByTestId('password').fill('secretpassword2')
            await page.getByRole('button', { name: 'Login' }).click()

            await page.getByText('a blog by the owner').getByRole('button', { name: 'view' }).click()

            await expect(page.getByRole('button', { name: 'delete' })).toHaveCount(0)
        })
    })

    test('blogs are ordered by the likes descending', async ({ page, request }) => {
        await page.goto('http://localhost:5173')
        await page.getByTestId('username').fill('johannes')
        await page.getByTestId('password').fill('password123')
        await page.getByRole('button', { name: 'Login' }).click()

        // Create blog 1 (0 likes)
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByTestId('title-input').fill('Blog 1')
        await page.getByTestId('author-input').fill('Author 1')
        await page.getByTestId('url-input').fill('url1.com')
        await page.getByRole('button', { name: 'create' }).click()

        // Create blog 2 (0 likes)
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByTestId('title-input').fill('Blog 2')
        await page.getByTestId('author-input').fill('Author 2')
        await page.getByTestId('url-input').fill('url2.com')
        await page.getByRole('button', { name: 'create' }).click()


        // Get the token directly from backend
        const loginResponse = await request.post('http://localhost:3001/api/login', {
            data: { username: 'johannes', password: 'password123' }
        })
        const { token } = await loginResponse.json()

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }

        // Get all blogs from backend to get their IDs
        const blogsResponse = await request.get('http://localhost:3001/api/blogs', { headers })
        const blogs = await blogsResponse.json()

        // Find your created blogs by title or author
        const blog1 = blogs.find(b => b.title === 'Blog 1')
        const blog2 = blogs.find(b => b.title === 'Blog 2')

        // Update likes via API PATCH or PUT request
        await request.put(`http://localhost:3001/api/blogs/${blog1.id}`, {
            data: {
                ...blog1,
                likes: 10 // set likes here
            },
            headers
        })

        await request.put(`http://localhost:3001/api/blogs/${blog2.id}`, {
            data: {
                ...blog2,
                likes: 5
            },
            headers
        })

        // Reload page to get updated blogs with likes
        await page.reload()
        await page.waitForSelector('[data-testid^="blog-"]')

        const blogContainers = page.locator('[data-testid^="blog-"]')
        const count = await blogContainers.count()

        const likesArray = []
        for (let i = 0; i < count; i++) {
            const blog = blogContainers.nth(i)
            await blog.getByRole('button', { name: 'view' }).click()

            const likesText = await blog.locator('p:has-text("likes")').textContent()

            const likes = parseInt(likesText.replace(/[^0-9]/g, ''))
            console.log('likesText:', likesText)
            likesArray.push(likes)
        }

        for (let i = 0; i < likesArray.length - 1; i++) {
            expect(likesArray[i] >= likesArray[i + 1]).toBe(true)
        }

    })


})