import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySelector from './components/CitySelector';
import WeatherCurrent from './components/WeatherCurrent';
import WeatherForecast from './components/WeatherForecast';
import Map from './components/Map';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Вывод API_KEY в консоль
//console.log("API_KEY:", API_KEY);

// Используем переменную окружения
const BASE_URL = 'https://api.weatherapi.com/v1/';

const CITIES = [
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
  { name: 'Saint Petersburg', lat: 59.9311, lon: 30.3609 },
  { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Amsterdam', lat: 52.3676, lon: 4.9041 }
];

const App = () => {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${BASE_URL}forecast.json`, {
          params: {
            key: API_KEY,
            q: selectedCity.name,
            days: 5
          }
        });

        const { current, forecast } = response.data;

        setCurrentWeather({
          temp: current.temp_c,
          description: current.condition.text
        });

        setForecast(forecast.forecastday.map(day => ({
          date: day.date,
          temp: day.day.avgtemp_c,
          description: day.day.condition.text
        })));
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
        <h1>Weather App</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <CitySelector cities={CITIES} onChange={setSelectedCity} />
        <WeatherCurrent weather={currentWeather} />
        <WeatherForecast forecast={forecast} />
        <Map city={selectedCity} />
      </div>
    </ThemeProvider>
  );
};

export default App;