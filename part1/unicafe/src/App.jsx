import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  const HandleAddGood = () => {
    setGood(previousValue => previousValue + 1)
  }

  const HandleAddNeutral = () => {
    setNeutral(previousValue => previousValue + 1)
  }

  const HandleAddBad = () => {
    setBad(previousValue => previousValue + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={HandleAddGood}>good</button>
      <button onClick={HandleAddNeutral}>neutral</button>
      <button onClick={HandleAddBad}>bad</button>

      <h2>statistics</h2>

      <p>good {good !== 0 ? good : null}</p>
      <p>neutral {neutral !== 0 ? neutral : null}</p>
      <p>bad {bad !== 0 ? bad : null}</p>
    </div>
  )
}

export default App