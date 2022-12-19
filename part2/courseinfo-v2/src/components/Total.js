const Total = ({ parts }) => {
  const sum = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

export default Total
