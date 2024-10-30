import CountryData from './CountryData'
import { useState } from 'react'

const Countries = ({countries}) => {
    const [showData, setShowData] = useState(null);
    if( countries.length > 10 ) return <p>Too many marches, specify another filter</p>
    else if(countries.length === 0) return <p>No countries found</p>

    return <>
        <ul>
            {countries.map(country => 
                <li key={country.area}>
                    {country.name.common} <button onClick={()=>setShowData(showData === country.area ? null : country.area)}>{showData === country.area ? 'hide' : 'show'}</button>
                    {showData === country.area ? <CountryData country={country}></CountryData> : null}
                </li>)}
        </ul>
    </>
}

export default Countries