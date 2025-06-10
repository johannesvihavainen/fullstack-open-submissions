import BlogForm from './BlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('submitting the form calls createBlog with correct details', async () => {
    const createBlog = vi.fn()
    render(<BlogForm addBlog={createBlog} />)

    const user = userEvent.setup()
    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'rich dad, poor dad')
    await user.type(authorInput, 'robert kyosake')
    await user.type(urlInput, 'richdadpoordad.com')
    await user.click(createButton)

    expect(createBlog).toHaveBeenCalledTimes(1)

    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'rich dad, poor dad',
        author: 'robert kyosake',
        url: 'richdadpoordad.com',
    })
})