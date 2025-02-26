import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  let average = (good - bad) / (good + neutral + bad)
  let positive = (good / (good + neutral + bad)) * 100

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>statistics</h2>

        <table>
          <tbody>
            <StatisticLine text='good' value={good !== 0 ? good : null} />
            <StatisticLine text='neutral' value={neutral !== 0 ? neutral : null} />
            <StatisticLine text='bad' value={bad !== 0 ? bad : null} />
            <StatisticLine text='all' value={good + neutral + bad !== 0 ? good + neutral + bad : null} />
            <StatisticLine text='average' value={average !== 0 && !isNaN(average) ? average : null} />
            <StatisticLine text='positive' value={positive !== 0 && !isNaN(positive) ? positive + ' %' : null} />
          </tbody>

        </table>

      </div>
    )
  }
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
      <Button handleClick={HandleAddGood} text='good' />
      <Button handleClick={HandleAddNeutral} text='neutral' />
      <Button handleClick={HandleAddBad} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App