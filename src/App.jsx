import { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import TemperatureChart from './components/TemperatureChart'; 
import './App.css';
import logo from './assets/logo_transparente.png';

function App() {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Tokyo');
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    try {
      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=en`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=en`
      );

      setCurrent(currentRes.data);
      setForecast(forecastRes.data);
    } catch (error) {
      // Aqui você pode apenas não fazer nada ou deixar o catch vazio
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="app-container">
      <img src={logo} alt="Logo transparente" className="logo" />
      <h1 className="app-title">Yuki Weather</h1>
      <div className="search-bar">
        <input 
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      {current && <CurrentWeather data={current} />}
      {forecast && <Forecast data={forecast} />}
      {forecast && <TemperatureChart forecastData={forecast} />} 
    </div>
  );
}

export default App;
