const Person = ({person, handleDeletePerson}) => <>
    <li>
        {person.name} | {person.number}
        <button onClick={() => handleDeletePerson(person)}>delete</button>
    </li>
</>

export default Person;