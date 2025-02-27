import { useState } from 'react'

const DisplayPersons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => {
        return <p key={person.id}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')

  const addPerson = (event) => {
    console.log(newName);
    event.preventDefault()
    const updatedData = { name: newName, number: newNumber, id: (persons.reduce((max, person) => (person.id > max ? person.id : max), -Infinity)) + 1 }
    console.log(updatedData.id);

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

  const handleFilter = (event) => {
    const search = event.target.value.toLowerCase()
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(search)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleFilter} /></div>
      <form onSubmit={addPerson}>
        <div>name: <input onChange={handleNameInput} value={newName} /></div>
        <div>number: <input onChange={handleNumberInput} value={newNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={filteredPersons ? filteredPersons : persons} />
    </div>
  )
}

export default App