import React from 'react'
import PropTypes from 'prop-types';

const SuccessMessage = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="success-message">
            {message}
        </div>
    )
}

SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
  };

export default SuccessMessage