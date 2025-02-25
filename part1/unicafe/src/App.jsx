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

  const CalculateAverage = ({ good, neutral, bad }) => {
    let average = (good - bad) / (good + neutral + bad)
    return (
      <p>average {average !== 0 && !isNaN(average) ? average : null}</p>
    )
  }

  const CalculatePositive = () => {
    let positive = (good / (good + neutral + bad)) * 100
    return (
      <p>positive {positive !== 0 && !isNaN(positive) ? positive + ' %': null}</p>
    )
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
      <p>all {good + neutral + bad !== 0 ? good + neutral + bad : null}</p>
      <CalculateAverage good={good} neutral={neutral} bad={bad} />
      <CalculatePositive />
    </div>
  )
}

export default App