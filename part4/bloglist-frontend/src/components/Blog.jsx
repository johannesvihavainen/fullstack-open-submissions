import { useState } from "react"

const Blog = ({ blog, updateBlog, user, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }
    updateBlog(blog.id, updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={handleLikes}>like</button></p>
          <p>{blog.user.name}</p>
          {blog.user && user && blog.user.username === user.username && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog