import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addAnecdote, getAnecdotes } from './requests'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  const mutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const addNewAnecdote = (anecdote) => {
    mutation.mutate(anecdote)
  }

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    voteMutation.mutate(updatedAnecdote)
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
