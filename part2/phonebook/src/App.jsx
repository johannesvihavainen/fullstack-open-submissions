import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import personService from './services/persons'
import DisplayPersons from './components/DisplayPersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        const getPersonWithId = response.data.map(person => {
          return { ...person, id: person._id }
        })
        setPersons(getPersonWithId)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(obj => obj.name === newName)) {
      const confirm = window.confirm(`the name ${newName} cannot be used again. Replace the phone number with a new one?`)

      if (confirm) {
        persons.map(user => {
          if (user.name === newName) {
            const updatedData = {
              name: newName,
              number: newNumber
            }
            axios.put(`https://phonebook-backend-nameless-bush-5256.fly.dev/api/persons${user.id}`, updatedData)
              .then((response) => {
                setPersons(persons.map(person => person.id === user.id ? response.data : person))
                setNewName('')
                setNewNumber('')
                alert(
                  `the number ${newNumber} was successfully replaced for ${newName} `
                )

              })
          }
        })
      } else {
        alert('Canceled.')
      }




      // alert(`the name ${newName} cannot be used again.`)
      setNewName('')


    } else {
      const updatedData = { name: newName, number: newNumber }
      axios.post(`https://phonebook-backend-nameless-bush-5256.fly.dev/api/persons`, updatedData)
        .then(response => {
          console.log('data sent successfully to server', response.data)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(
            `${newName} with number ${newNumber} was successfully added into the phonebook`
          )

          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000);
        })
        .catch(error => {
          console.error('error sending data', error)

          if (error.response && error.response.data.error) {
            setErrorMessage(error.response.data.error)
          } else {
            setErrorMessage('An unexpected error occurred. Please try again.')
          }

          setTimeout(() => {
            setSuccessMessage(null)
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  const deleteName = (id) => {
    const findPerson = persons.find(person => person.id === id)
    const confirm = window.confirm(`Delete ${findPerson?.name}`)

    if (confirm) {
      personService
        .remove(id).then(() => {
          setPersons(persons.filter(person => person.id !== id))
          console.log('deleting person with id:', id);
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(
            `${findPerson?.name} with number ${findPerson?.number} was already removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    } else {
      alert('Canceled.')
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
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} />
      <h3>Numbers</h3>
      <DisplayPersons persons={filteredPersons ? filteredPersons : persons} deleteName={deleteName} />
    </div>
  )
}

export default App