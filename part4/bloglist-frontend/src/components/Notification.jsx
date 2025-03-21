import '../styles/messages.css'
import PropTypes from "prop-types"

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={type === 'success' ? 'success' : 'error'}>
            {message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
}

export default Notification