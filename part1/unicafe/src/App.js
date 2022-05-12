import { useState } from 'react'

const Header = ({ title }) => (
  <h1> {title} </h1>
)

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}> {text} </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td> {text} </td> 
    <td> {value} </td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = (good * 1 + bad * -1) / total;
  const positive = `${good / total * 100} %`

  return (
    <>
      <Header title="statistics" />
      {total !== 0 
      ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
        ) : (
          <div> No feedback given </div>
        )
      }
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App