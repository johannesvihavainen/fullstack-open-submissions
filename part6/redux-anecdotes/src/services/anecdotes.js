import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = (content) => {
    const newAnecdote = { content, votes: 0 }
    return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

const update = (id, updatedAnecdote) =>
    axios.put(`${baseUrl}/${id}`, updatedAnecdote).then(res => res.data)

export default { getAll, createNew, update }