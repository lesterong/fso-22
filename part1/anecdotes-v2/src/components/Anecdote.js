const Anecdote = ({ anecdotes, points, index }) => {
  return (
    <>
      <div>{anecdotes[index]}</div>
      <div>has {points[index]} votes</div>
    </>
  )
}

export default Anecdote
