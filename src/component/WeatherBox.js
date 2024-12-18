import React from 'react'

const WeatherBox = ({ weather }) => {
  const celsiusToFahrenheit = (celsius) => {
      return (celsius * 9/5) + 32;
  }
  let fahrenheit = celsiusToFahrenheit(weather?.main.temp).toFixed(1);
  return (
      <div className="weather-box">
          <h1>{weather?.name}</h1>
          <h2>{weather?.main.temp}°C / {fahrenheit}°F</h2>
          <h3>{weather?.weather[0].description}</h3>
      </div>
  );
}
export default WeatherBox