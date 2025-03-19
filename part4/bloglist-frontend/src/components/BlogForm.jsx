import { useState } from "react"

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
                title: <input type="text" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                author: <input type="text" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
            </div>
            <div>
                url: <input type="text" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogForm