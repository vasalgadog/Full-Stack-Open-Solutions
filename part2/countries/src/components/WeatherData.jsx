import weaterService from '../services/weather'
import { useState, useEffect } from 'react'

const iconUrl = "https://openweathermap.org/img/wn"

const WeatherData = ({latlng}) => {
    const [weatherData, setWeatherData] = useState(null)

    useEffect( () => { 
        weaterService.getWeather(latlng).then((response) => {
            setWeatherData(response)
        })
    },[latlng])
    if(!weatherData) return <></>
    return <>
            <h3>Weather</h3>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <img src={`${iconUrl}/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description}></img>
            <p>Description: {weatherData.weather[0].main}</p>
        </>
}

export default WeatherData