import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inputValue, setInputValue] = useState('')

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
  }

  const ReturnCountries = () => {
    if (!data) {
      return <p>data is loading.</p>
    } else {

      const filteredCountries = data.filter(item => {
        return item.name.common.toLowerCase().includes(inputValue.toLowerCase())
      })

      return (
        <div>
          {filteredCountries.map(item => (
            <p key={item.name.common}>{item.name.common}</p>
          ))}
        </div>
      )
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
