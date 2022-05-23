import { useState } from "react"

const Countries = ({ showDetails, setShowDetails, countries }) => {
  const [detailCountry, setDetailCountry] = useState({})
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
                </div>
              )
            }
          </>
        )}
    </>
  )
}

export default Countries