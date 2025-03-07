import { useEffect, useState } from 'react'
import axios from "axios"

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const FetchWeatherData = (item) => {
    const [data, setData] = useState(null)

    let capital = item.item
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
                setData(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [])

    console.log(data);

    return (
        <div>
            {data ? (
                <div>
                    <p>Weather in {capital}</p>
                    <p>Temperature {data.main.temp}°C</p>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather icon" />
                    <p>Wind {data.wind.speed} m/s</p>
                </div>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    )

}


export default FetchWeatherData