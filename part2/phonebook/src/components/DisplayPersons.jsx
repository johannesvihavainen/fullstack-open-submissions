const DisplayPersons = ({ persons, deleteName }) => {
  return (
    <div>
      {persons.map(person => {
        return <p key={String(person.id)}>{person.name} {person.number} <span><button onClick={() => deleteName(String(person.id))}>delete</button></span></p>
      })}
    </div>
  )
}

export default DisplayPersons