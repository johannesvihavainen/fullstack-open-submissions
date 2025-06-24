import { useCounterValue } from '../contexts/CounterContext'

const Display = () => {

  const counter = useCounterValue()
  return <div>
    {counter}
  </div>
}


export default Display