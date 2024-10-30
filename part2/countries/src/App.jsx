import { useState, useEffect } from 'react'
import countryService from './services/country'
import Countries from './components/Countries'
import CountryData from './components/CountryData'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState([])

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response)
      setSearch(countries)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const handleSearch = (event) => {
    if(event.target.value.length==0) setSearch(countries)
    setSearch(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <>
    <search>
      find countries: <input type="text" placeholder="Search..." onChange={handleSearch}/>
    </search>
    {search.length !== 1 ? <Countries countries={search}/> : <CountryData country={search[0]} /> }
    </>
  )
}

export default App
