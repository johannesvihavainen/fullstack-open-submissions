import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'

test('renders title and author, but not url or likes', () => {
    const blog = {
        title: 'rich dad, poor dad',
        author: 'Robert Kyosaki',
        url: 'richdadpoordad.com',
        likes: 50,
    }


    render(<Blog blog={blog} onLike={() => { }} />)

    const titleAuthor = screen.getByText(/rich dad, poor dad/)
    expect(titleAuthor).toBeDefined()

    const details = screen.queryByText('richdadpoordad.com')
    expect(details).toBeNull()

})


test('shows url and likes when view button is clicked', async () => {
    const blog = {
        title: 'rich dad, poor dad',
        author: 'Robert Kyosaki',
        url: 'richdadpoordad.com',
        likes: 50,
        user: {
            username: 'testuser',
            name: 'Test User'
        },
    }

    const user = {
        username: 'testuser',
        name: 'Test User',
    }

    const mockHandleLikes = vi.fn()
    const mockHandleDelete = vi.fn()
    const mockOnDelete = vi.fn()
    const mockUpdateBlog = vi.fn()

    render(
        <Blog
            blog={blog}
            handleLikes={mockHandleLikes}
            handleDelete={mockHandleDelete}
            onDelete={mockOnDelete}
            updateBlog={mockUpdateBlog}
            user={user}
        />
    )

    const userSim = userEvent.setup()
    const viewButton = screen.getByText('view')
    await userSim.click(viewButton)

    expect(screen.getByText('richdadpoordad.com')).toBeDefined()
    expect(screen.getByText('likes 50')).toBeDefined()

})


test('like button calls event handler twice if clicked twice', async () => {
    const blog = {
        title: 'rich dad, poor dad',
        author: 'Robert Kyosaki',
        url: 'richdadpoordad.com',
        likes: 50,
        id: '123',
        user: {username: 'testuser' },
    }

    const updateBlog = vi.fn()
    const user = userEvent.setup()

    render(
        <Blog
            blog={blog}
            updateBlog={updateBlog}
            onDelete={() => { }}
            user={{ username: 'testuser'}}
        />
    )

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog).toHaveBeenCalledTimes(2)

})



