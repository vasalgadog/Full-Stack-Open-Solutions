import WeatherData from './WeatherData'

const Countrycountry = ({country}) => {
    if(!country) return <></>

    return <>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>Languages: </p>        
        <ul>
            {Object.values(country.languages).map(language => (
                <li key={language}>{language}</li>
            ))}
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt} width="20%" height="20%"/>
        <WeatherData latlng = {country.latlng} />
    </>
}

export default Countrycountry