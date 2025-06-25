import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"

const AnecdoteForm = ({ addNewAnecdote }) => {
  const [notification, dispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (content.length < 5) {
      dispatch({ type: 'SET', payload: 'anecdote too short, must have length of 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000);
      return
    }
    addNewAnecdote({ content, votes: 0 })
    event.target.anecdote.value = ''
    console.log('new anecdote created:', content);

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
