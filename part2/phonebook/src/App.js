import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [notif, setNotif] = useState({ message: '' })

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
            setNotif({ message: `Updated ${newName}` })
            setTimeout(() => {
              setNotif({ message: `Updated ${newName}` })
            }, 5000)
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          })
          .catch(error => {
            setNotif({ 
              message: `Information of ${persons.find(person => person.id === id).name} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotif({ message: '' })
            }, 5000)
          }) 
        return
      } else {
        return
      }
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotif({ message: `Added ${newName}` })
        setTimeout(() => {
          setNotif({ message: '' })
        }, 5000)
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
      .then(() => {
        setNotif({ message: `Deleted ${persons.find(person => person.id === id).name}` })
        setTimeout(() => {
          setNotif({ message: '' })
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notif} />
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