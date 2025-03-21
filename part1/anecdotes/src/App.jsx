import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const displayRandomAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const DisplayVotes = () => {
    if (anecdotes[selected]) {
      return <p>has {votes[selected]} votes</p>
    }
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const DisplayHighestVote = () => {
    const largest = Math.max(...votes)
    const index = votes.indexOf(largest)

    if (largest === 0) {
      return <p>still waiting for a vote.</p>
    } else {
      return (
        <div>
          <p>{anecdotes[index]}</p>
          <p>has {votes[index]} votes</p>
        </div>
      )
    }
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <DisplayVotes />
      <button onClick={addVote}>vote</button>
      <button onClick={displayRandomAnecdote}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <DisplayHighestVote />


    </div>
  )
}

export default App