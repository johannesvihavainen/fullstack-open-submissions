import React from 'react'
import PropTypes from 'prop-types';

const DisplayPersons = ({ persons, deleteName }) => {
  return (
    <div>
      {persons.map(person => {
        return <p key={String(person.id)}>{person.name} {person.number} <span><button onClick={() => deleteName(String(person.id))}>delete</button></span></p>
      })}
    </div>
  )
}

DisplayPersons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  deleteName: PropTypes.func.isRequired,
};

export default DisplayPersons