import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const addAnecdote = async (newAnecdote) => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

export const updateAnecdote = async (updatedAnecdote) => {
    const res = await fetch(`${baseUrl}/${updatedAnecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote),
    })
    if (!res.ok) {
        throw new Error('failed to update anecdote')
    }
    return res.json()
}