const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;

async function getWeatherByCity(city) {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: { q: city, appid: API_KEY, units: 'metric' }
  });

  const data = response.data;

  return {
    city: data.name,
    current: {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].description
    }
  };
}

async function getWeatherByCoords(lat, lon) {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: { lat, lon, appid: API_KEY, units: 'metric' }
  });

  const data = response.data;

  return {
    city: data.name,
    current: {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].description
    }
  };
}

module.exports = {
  getWeatherByCity,
  getWeatherByCoords
};
