const DisplayPersons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => {
        return <p key={String(person.id)}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

export default DisplayPersons