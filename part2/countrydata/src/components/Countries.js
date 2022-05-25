import axios from "axios"
import { useEffect, useState } from "react"


const Countries = ({ showDetails, setShowDetails, countries }) => {
  const [detailCountry, setDetailCountry] = useState({})
  const [weather, setWeather] = useState({
    main: '',
    weather: [''],
    wind: ''
  })
  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    if (countries.length === 1 || showDetails) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${showDetails ? detailCountry.capital[0] : countries[0].capital[0]}&appid=${api_key}`)
        .then(res => setWeather(res.data))
    }
  }

  useEffect(hook, [showDetails, countries, detailCountry])

  return (
    <>
      {countries.length > 10
        ? (
          <div> Too many matches, specify another filter </div>
        ) : (
          <>
            {countries.length !== 1 && !showDetails
              ? (
                countries.map((country, idx) => (
                  <div key={country.name.common}>
                    {country.name.common} 
                    <button
                      onClick={() => {
                        setDetailCountry(country)
                        setShowDetails(true)
                      }}
                    >
                      show
                    </button>
                  </div>
                ))
              ) : (
                <div>
                  <h1>
                    {showDetails ? detailCountry.name.common : countries[0].name.common}
                  </h1>
                  <div> 
                    capital&nbsp;
                    {showDetails ? detailCountry.capital[0] : countries[0].capital[0]}
                  </div>
                  <div> 
                    area&nbsp;
                    {showDetails ? detailCountry.capital[0] : countries[0].area}
                  </div>
                  <h3> languages: </h3>
                  <ul>
                    {Object.values(showDetails ? detailCountry.languages : countries[0].languages)
                      .map(lang => 
                        <li key={lang}> {lang} </li>
                      )
                    }
                  </ul>
                  <img
                    src={showDetails ? detailCountry.flags.png : countries[0].flags.png}
                    alt={showDetails ? detailCountry.name.common : countries[0].name.common}
                  />
                  <h3> Weather in {showDetails ? detailCountry.capital[0] : countries[0].capital[0]}</h3>
                  <p> temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                  <p> wind {weather.wind.speed} m/s</p>
                </div>
              )
            }
          </>
        )}
    </>
  )
}

export default Countries