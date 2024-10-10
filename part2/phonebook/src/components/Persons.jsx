import Person from './Person'

const Persons = ({persons, filter}) => <>
    <ul>
        {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map((person) => <Person key={person.id} person={person}/>)}
    </ul>
</> 

export default Persons;