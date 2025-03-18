import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setSuccessMessage(`a new blog: ${newTitle} by ${newAuthor} was just added`)
      setTimeout(() => setSuccessMessage(null), 5000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setErrorMessage('there was an error creating the blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

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

          <h3>create new blog</h3>
          <form onSubmit={addBlog}>
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


          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}

    </div>
  )
}

export default App