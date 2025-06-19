import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)