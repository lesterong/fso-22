const Total = ({ parts }) => {
  const sum = parts.reduce(
    (res, part) => res + part.exercises, 0
  )
  return (
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
}

export default Total