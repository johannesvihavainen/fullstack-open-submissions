import React from 'react'
import PropTypes from 'prop-types';

const PersonForm = ({ addPerson, newName, newNumber, handleNameInput, handleNumberInput }) => {
    return (
        <form onSubmit={addPerson}>
            <div>name: <input onChange={handleNameInput} value={newName} /></div>
            <div>number: <input onChange={handleNumberInput} value={newNumber} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

PersonForm.propTypes = {
    addPerson: PropTypes.func.isRequired,
    newName: PropTypes.string.isRequired,
    newNumber: PropTypes.string.isRequired,
    handleNameInput: PropTypes.func.isRequired,
    handleNumberInput: PropTypes.func.isRequired,
  };
  

export default PersonForm

