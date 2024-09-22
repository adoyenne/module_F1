import React from 'react';

const WeatherCurrent = ({ weather }) => {
  if (!weather) return <div>Loading current weather...</div>;

  return (
    <div>
      <h2>Current Weather</h2>
      <p>Temperature: {weather.temp}°C</p>
      <p>Description: {weather.description}</p>
    </div>
  );
};

export default WeatherCurrent;