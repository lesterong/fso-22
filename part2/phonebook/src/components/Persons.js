const Persons = ({ deletePerson, persons }) => {
  return (
    <>
      {persons.map(person => (
        <div key={person.id}>
          {`${person.name} ${person.number}`}
          <button
            onClick={() => 
              window.confirm(`Delete ${person.name}?`) && deletePerson(person.id)
            }
          > 
            delete
          </button>
        </div>
      ))}
    </>
  )
}

export default Persons