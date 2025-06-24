import { useContext } from "react"
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return notification ? <div style={style}>{notification}</div> : null
}

export default Notification
