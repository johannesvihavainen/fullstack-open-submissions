import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = useRef()



  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Login error:', exception.response?.data || exception)
      setErrorMessage('Sorry to have to let you know this, but you just do not have the valid credentials.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        username
        <input
          type="text"
          data-testid='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          data-testid='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      setErrorMessage('there was an error deleting the blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setSuccessMessage(`a new blog: ${blogObject.title} by ${blogObject.author} was just added`)
      setTimeout(() => setSuccessMessage(null), 5000)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage('there was an error creating the blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      const response = await blogService.update(id, updatedBlog, user.token)
      setBlogs(blogs.map(blog => blog.id === id ? response : blog))
    } catch (error) {
      console.error('there was an error updating the blog:', error)
    }
  }

  const sortBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification message={successMessage} type="success" />
          <p>{user.name} logged in <span><button onClick={() => {
            window.localStorage.clear()
            setUser(null)
          }}>log out</button></span></p>

          < Togglable buttonLabel="Create new blog" ref={blogFormRef} >
            <BlogForm addBlog={addBlog} />
          </Togglable >


          {sortBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} onDelete={handleDelete} />
          )}
        </div>}

    </div>
  )
}

export default App