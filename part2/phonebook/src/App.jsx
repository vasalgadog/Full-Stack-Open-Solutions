import { useEffect, useState } from 'react'
import personService from './services/person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(
    {
      messaje:"",
      type:""
    }
  )
  const [lastIndex, setLastIndex] = useState(0)

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
      setLastIndex(response.reduce((lastIndex, person) => Math.max(lastIndex, person.id), 0))
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: (lastIndex + 1).toString(),
      name: newName,
      number: newNumber
    }
    const person = persons.find(person => person.name === personObject.name)
    if(person){
      personObject.id = person.id
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`))
        personService.update(personObject)
          .then((response) => {
            console.log(response)
            setPersons(persons.map((person) => person.id === personObject.id ? personObject : person))
            setNotification({
              "message":`${personObject.name} updated`,
              "type":'success'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
            setFilter('')
          })
          .catch((error) => {
            let _message = `Failed to update ${personObject.name}`
            console.log(error)
            if(error.status==404){
              _message=`Information of ${personObject.name} has already been removed from server`
            }
            setNotification({
              "message": _message,
              "type":'error'
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      return
    }

    personService.getByName(personObject.name).then((response) => {
      if(response.length > 0){
        setNotification({
          "message":`Information of ${personObject.name} has already been added to server`,
          "type":'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        personService.getAll().then((response) => {
          setPersons(response)
          setLastIndex(response.reduce((lastIndex, person) => Math.max(lastIndex, person.id), 0))
        }).catch((error) => {
          console.log(error)
        })
        return
      }
  
      personService.create(personObject)
        .then((response) => {
          setPersons(persons.concat(personObject))
          //alert(`${newName} is already added to phonebook`)
          setNotification({
            "message":`${personObject.name} added`,
            "type":'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setLastIndex(lastIndex + 1)
          setNewName('')
          setNewNumber('')
          setFilter('')
        })
        .catch((error) => {
          setNotification({
            "message":`Failed to add ${personObject.name}`,
            "type":'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
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
          setLastIndex(persons.reduce((lastIndex, person) => Math.max(lastIndex, person.id), 0))
          setNotification({
            "message":`${personToDel.name} deleted successfully`,
            "type":"success"
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch((error) => {
          if(error.status==404){
            setNotification({
              "message":`Information of ${personToDel.name} has already been removed from server`,
              "type":"error"
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            return
          }
          setNotification({
            "message":`Error deleting ${personToDel.name}`,
            "type":"error"
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App