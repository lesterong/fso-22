import StatisticLine from './StatisticLine';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = good / all * 100 || 0
  const hasFeedback = all !== 0
  return (
    <>
      <h1>statistics</h1>
      {hasFeedback ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      ) : (
        <div>No feedback given</div>
      )
    }
    </>
  )
}

export default Statistics;
