import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'welcome to anecdotes!',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})


export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, durationInSeconds) => {
    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, durationInSeconds * 1000)
    }
}

export default notificationSlice.reducer