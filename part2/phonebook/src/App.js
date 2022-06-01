import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(initPersons => setPersons(initPersons))
  }
  useEffect(hook, [])

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

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const personsToShow = query
    ? persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQuery={handleQuery} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App