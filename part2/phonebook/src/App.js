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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const id = person.id
        const updatedPerson = { ...person, number: newNumber }
        personService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          })
        return
      } else {
        return
      }
      // alert(`${newName} is already added to phonebook`)
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

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
  }

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
      <Persons deletePerson={deletePerson} persons={personsToShow} />
    </div>
  )
}

export default App