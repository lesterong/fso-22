import Part from "./Part"

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(p => (
        <Part key={p.id} part={p.name} exercise={p.exercises} />
      ))}
    </>
  )
}

export default Content
