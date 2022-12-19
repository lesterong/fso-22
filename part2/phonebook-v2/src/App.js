import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const initDetails = {
    name: '',
    number: ''
  }
  const [newDetails, setNewDetails] = useState(initDetails)

  const handleInputChange = (e) => {
    setNewDetails({ ...newDetails, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (persons.map(p => p.name).includes(newDetails.name.trim())) {
      alert(`${newDetails.name.trim()} is already added to phonebook`)
      return
    }
    const personObj = {
      name: newDetails.name.trim(),
      number: newDetails.number,
      id: persons.length + 1
    }

    setNewDetails(initDetails)
    setPersons(persons.concat(personObj))
  }

  const [query, setQuery] = useState('')
  const handleQuery = (e) => setQuery(e.target.value)
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQuery={handleQuery} />

      <h3>add a new</h3>
      <PersonForm newDetails={newDetails} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App