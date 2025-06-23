const AnecdoteForm = ({addNewAnecdote}) => {

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (content.length < 5) {
      alert('anecdote must be at least 5 characters long')
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
