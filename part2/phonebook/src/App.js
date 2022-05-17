import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const handleName = e => setNewName(e.target.value)
  const handleNumber = e => setNewNumber(e.target.value)
  const handleQuery = e => setQuery(e.target.value)
  
  const handleSubmit = e => {
    e.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = query
    ? persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={query}
          onChange={handleQuery}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input 
            value={newName}
            onChange={handleName}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <div key={person.name}>
          {`${person.name} ${person.number}`}
        </div>
      ))}
    </div>
  )
}

export default App