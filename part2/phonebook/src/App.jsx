import { useState } from 'react'

const DisplayPersons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => {
        return <p key={person.name}>{person.name}</p>
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ])
  const [newName, setNewName] = useState('')

  const addName = () => {
    event.preventDefault()
    const updatedData = { name: newName }
    setPersons(persons.concat(updatedData))
    setNewName('')
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleInput} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} />
    </div>
  )
}

export default App