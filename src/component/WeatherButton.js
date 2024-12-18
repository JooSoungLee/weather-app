import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';

const WeatherButton = ({ citis, setCity, getCurrentLocation }) => {
  return (
      <div className="button-group">
          <button className="button" onClick={() => setCity("")}>Current Location</button>
          {citis.map((item, index) => (
              <button key={index} className="button" onClick={() => setCity(item)}>
                  {item}
              </button>
          ))}
      </div>
  );
}

export default WeatherButton