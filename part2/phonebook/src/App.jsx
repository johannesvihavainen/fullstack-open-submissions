import { useState } from 'react'

const DisplayPersons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => {
        return <p key={person.name}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    console.log(newName);
    event.preventDefault()
    const updatedData = { name: newName, number: newNumber }
    if (persons.some(person => person.name === updatedData.name)) {
      alert(`${updatedData.name} is already added to the phonebook.`)
      return
    } else {
      setPersons(persons.concat(updatedData))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNameInput} value={newName} /></div>
        <div>number: <input onChange={handleNumberInput} value={newNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} />
    </div>
  )
}

export default App