const Hello = (props) => (
  <div>
    <p>Hello {props.name} </p>
  </div>
)

const Footer = () => {
  return (
    <div>
      greeting app created by me
    </div>
  )
}

const App = () => {
  return (
    <>
      <h1> Greetings </h1>
      <Hello name="george" />
      <Hello name="daisy" />
      <Footer />
    </>
  )
}

export default App
