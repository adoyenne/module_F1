import React from 'react';

const WeatherForecast = ({ forecast }) => {
  if (!forecast) return <div>Loading forecast...</div>;

  return (
    <div>
      <h2>5-Day Forecast</h2>
      {forecast.map((day) => (
        <div key={day.date}>
          <p>Date: {day.date}</p>
          <p>Temperature: {day.temp}°C</p>
          <p>Description: {day.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;