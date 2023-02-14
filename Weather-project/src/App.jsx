import "./style/App.css"
import { useEffect } from "react"
import { useState } from "react"
import { getFormattedWeatherData } from "./WeatherService"
import Description from "./components/Description"

function App() {
  const [city, setCity] = useState("Florianopolis");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units)
      setWeather(data)
    }

    fetchWeatherData();
  }, [city, units])



  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App">
      {weather && (
        <div className="ContAll"> 

          <div className="Inputs">
            <input onKeyDown={enterKeyPressed} className="Input" type="text" name="city" placeholder="City?" />
            <button onClick={(e) => handleUnitsClick(e)} className="InputButton">°F</button>
          </div>

          <div className="Temperature">
            <div className="Icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="WeatherIcon" />
              <h3>{weather.description}</h3>
            </div>

            <div className="Temp">
              <h1>
                {`${weather.temp.toFixed()}°${
                  units === "metric" ? "C" : "F"
                }`}
              </h1>
            </div>

          </div>

          <div className="TextTemp">
            <p>
            Welcome to our weather website! Here,
            you will find accurate and up-to-date
            information about the weather conditions in your region.
            Design by <a href="https://www.joaopedropn.com.br/"> João Pedro</a>
            </p>
          </div>

          <Description weather={weather} units={units}/>

        </div>
      )}
    </div>
  )
}

export default App
