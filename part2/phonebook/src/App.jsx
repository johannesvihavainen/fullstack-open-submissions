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

  const addName = (event) => {
    console.log(newName);
    event.preventDefault()
    const updatedData = { name: newName }
    if (persons.some(person => person.name === updatedData.name)) {
      alert(`${updatedData.name} is already added to the phonebook.`)
      return
    } else {
      setPersons(persons.concat(updatedData))
      setNewName('')
    }
    
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleInput} />
        </div>
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