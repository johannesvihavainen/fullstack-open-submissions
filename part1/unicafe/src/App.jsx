import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h2>statistics</h2>

      <p>good {props.good !== 0 ? props.good : null}</p>
      <p>neutral {props.neutral !== 0 ? props.neutral : null}</p>
      <p>bad {props.bad !== 0 ? props.bad : null}</p>
      <p>all {props.good + props.neutral + props.bad !== 0 ? props.good + props.neutral + props.bad : null}</p>
      <CalculateAverage good={props.good} neutral={props.neutral} bad={props.bad} />
      <CalculatePositive good={props.good} neutral={props.neutral} bad={props.bad} />
    </div>
  )
}

const CalculateAverage = ({ good, neutral, bad }) => {
  let average = (good - bad) / (good + neutral + bad)
  return (
    <p>average {average !== 0 && !isNaN(average) ? average : null}</p>
  )
}

const CalculatePositive = ({ good, neutral, bad }) => {
  let positive = (good / (good + neutral + bad)) * 100
  return (
    <p>positive {positive !== 0 && !isNaN(positive) ? positive + ' %' : null}</p>
  )
}

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

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App