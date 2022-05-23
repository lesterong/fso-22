const Countries = ({ countries }) => {
  return (
    <>
      {countries.length > 10 
        ? (
          <div> Too many matches, specify another filter </div>
        ) : (
          <>
            {countries.length !== 1
              ? (
                countries.map(country => (
                  <div key={country.name.common}> {country.name.common} </div>
                ))
              ) : (
                <div>
                  <h1>{countries[0].name.common}</h1>
                  <div> capital {countries[0].capital[0]} </div>
                  <div> area {countries[0].area} </div>
                  <h3> languages: </h3>
                  <ul>
                    {Object.values(countries[0].languages).map(lang => 
                      <li key={lang}> {lang} </li>
                    )}
                  </ul>
                  <img src={countries[0].flags.png} alt={countries[0].name.common} />
                </div>
              )
            }
          </>
        )}
    </>
  )
}

export default Countries