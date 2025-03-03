import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import FetchWeatherData from './components/FetchWeatherData'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [preview, setPreview] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setData(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleInput = (event) => {
    setInputValue(event.target.value)
    setPreview(null)
  }

  const displayDetails = (item) => {
    setPreview(prev => (prev === item ? null : item))
  }

  const PreviewCountry = ({ item }) => {
    return (
      <div>
        <div key={item.name.common}>
          <h1>{item.name.common}</h1>
          <p>Capital {item.capital}</p>
          <p>Area {item.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(item.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img className='coat-of-arms' alt="coat of arms" src={item.coatOfArms.png} />
        </div>
      </div>
    )
  }


  const ReturnCountries = () => {
    if (!data) {
      return <p>data is loading.</p>
    } else {

      const filteredCountries = data.filter(item => {
        return item.name.common.toLowerCase().includes(inputValue.toLowerCase())
      })

      if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
      }
      else if (filteredCountries.length === 1) {
        return (
          <div>
            {filteredCountries.map(item => (
              <div key={item.name.common}>
                <h1>{item.name.common}</h1>
                <p>Capital {item.capital}</p>
                <p>Area {item.area}</p>
                <h2>Languages</h2>
                <ul>
                  {Object.values(item.languages).map(language => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
                <img className='coat-of-arms' alt="coat of arms" src={item.coatOfArms.png} />
                <FetchWeatherData item={item.capital}/>
              </div>
            ))}
          </div>
        )
      }
      else if (filteredCountries) {
        return (
          <div>
            {filteredCountries.map(item => (
              <p key={item.name.common}>{item.name.common} <span><button onClick={() => displayDetails(item)}>Show</button></span></p>
            ))}
            {preview && <PreviewCountry item={preview} />}
          </div>
        )
      }


    }
  }


  return (
    <div>
      <div>find countries <input value={inputValue} onChange={handleInput} /></div>
      <ReturnCountries />
    </div>
  )
}

export default App
