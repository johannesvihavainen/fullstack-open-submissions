import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import DisplayPersons from './components/DisplayPersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    console.log(newName);
    event.preventDefault()
    const updatedData = { name: newName, number: newNumber}
    console.log(updatedData.id);

    if (persons.some(person => person.name === updatedData.name)) {
      alert(`${updatedData.name} is already added to the phonebook.`)
      return
    } else {
      axios.post(`http://localhost:3001/persons/`, updatedData)
        .then(response => {
          console.log('data sent successfully to server', response.data)
          setPersons(persons.concat(updatedData))
          setNewName('')
          setNewNumber('')
        })
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
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} />
      <h3>Numbers</h3>
      <DisplayPersons persons={filteredPersons ? filteredPersons : persons} />
    </div>
  )
}

export default App