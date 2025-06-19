import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteActions'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)


    const handleVote = (id, content) => {
        dispatch(vote(id, content))
    }

    const filteredAnecdotes = anecdotes.filter(a =>
        a.content.toLowerCase().includes(String(filter).toLowerCase())
    )

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList