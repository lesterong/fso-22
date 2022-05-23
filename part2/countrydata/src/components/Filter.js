const Searchbar = ({ query, setQuery, setShowDetails }) => {
  return (
    <>
      find countries
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value)
          setShowDetails(false)
        }}
      />
    </>
  )
}

export default Searchbar