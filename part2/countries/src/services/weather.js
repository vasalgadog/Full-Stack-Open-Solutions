import axios from 'axios'

const appid = import.meta.env.VITE_SOME_KEY
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const units = 'metric'

const getWeather = (latlng) => {
    const lat=latlng[0]
    const lon=latlng[1]
    const request = axios.get(`${baseURL}?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`)
    return request.then(response => response.data)
}

export default {
    getWeather
}