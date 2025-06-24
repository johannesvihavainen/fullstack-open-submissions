import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addAnecdote, getAnecdotes } from './requests'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { updateAnecdote } from './requests'
import NotificationContext from './contexts/NotificationContext'
import { useContext } from 'react'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  const showNotification = (message) => {
    dispatch({ type: 'SHOW', payload: message })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000);
  }

  const mutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`anecdote '${newAnecdote.content}' created`)
    }
  })

  const addNewAnecdote = (anecdote) => {
    mutation.mutate(anecdote, {
      onSuccess: () => {
        dispatch({ type: 'SET', payload: `new anecdote '${anecdote.content}' added!` })
        setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
      }
    })
  }

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification(`anecdote '${updatedAnecdote.content}' voted`)
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    voteMutation.mutate(updatedAnecdote, {
      onSuccess: () => {
        dispatch({ type: 'SET', payload: `you voted '${anecdote.content}'` })
        setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
      }
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>anecdote service not available.</div>
  }



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addNewAnecdote={addNewAnecdote} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
