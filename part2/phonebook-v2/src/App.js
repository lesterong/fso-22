import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }
  useEffect(hook, [])

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