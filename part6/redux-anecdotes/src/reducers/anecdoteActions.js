import { voteAnecdote, createAnecdote } from "./anecdoteReducer";
import { showNotification } from './notificationReducer'

export const vote = (id, content) => {
    return dispatch => {
        dispatch(voteAnecdote(id))
        dispatch(showNotification(`You voted for '${content}'`, 5))
    }
}

export const addAnecdote = (content) => {
    return dispatch => {
        dispatch(createAnecdote(content))
        dispatch(showNotification(`You created a new anecdote '${content}'`, 5))
    }
}