import { useEffect, useState } from 'react'
import personService from './services/person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if(persons.filter(person => person.name === personObject.name).map((person) => personObject.id = person.id)){
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`))
        personService.update(personObject)
          .then((response) => {
            setPersons(persons.map((person) => person.id === personObject.id ? personObject : person))
            setNewName('')
            setNewNumber('')
            setFilter('')
          })
          .catch((error) => {
            console.log(error)
          })
      return
    }

    personService.create(personObject)
      .then((response) => {
        setPersons(persons.concat(personObject))
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeletePerson = (personToDel) => {
    if(window.confirm(`Delete ${personToDel.name}?`)){
      personService.deletePerson(personToDel.id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== personToDel.id))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App