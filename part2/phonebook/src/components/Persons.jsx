import Person from './Person'

const Persons = ({persons, filter, handleDeletePerson}) => <>
    <ul>
        {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map((person) => <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>)}
    </ul>
</> 

export default Persons;