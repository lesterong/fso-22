import { useEffect, useState } from "react"
import axios from 'axios'
import Countries from "./components/Countries"
import Filter from "./components/Filter"

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }
  useEffect(hook, [])

  const countriesToShow = query
    ? countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
    : countries

  return (
    <>
      <Filter query={query} setQuery={q => setQuery(q)} />
      <Countries countries={countriesToShow} />
    </>
  )
}

export default App