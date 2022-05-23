const Searchbar = ({ query, setQuery }) => {
  return (
    <>
      find countries
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </>
  )
}

export default Searchbar