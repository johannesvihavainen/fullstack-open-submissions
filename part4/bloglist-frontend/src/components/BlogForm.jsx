import { useState } from "react"
import PropTypes from "prop-types"

const BlogForm = ({ addBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        addBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>create new blog</h3>
            <div>
                <label htmlFor="title">title</label>
                <input data-testid="title-input" id="title" type="text" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                <label htmlFor="author">author</label>
                <input data-testid="author-input" id="author" type="text" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
            </div>
            <div>
                <label htmlFor="url">url</label>
                <input data-testid="url-input" id="url" type="text" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
}

export default BlogForm