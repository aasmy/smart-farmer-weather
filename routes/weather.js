const express = require('express');
const router = express.Router();
const { getWeatherByCity, getWeatherByCoords } = require('../services/weatherAPI');
const { getRecommendation } = require('../services/recommendation');

router.get('/', async (req, res) => {
  const { city, lat, lon, crop } = req.query;
  const cropName = crop || 'your crop';

  try {
    let weatherData;

    if (lat && lon) {
      weatherData = await getWeatherByCoords(lat, lon);
    } else if (city) {
      weatherData = await getWeatherByCity(city);
    } else {
      return res.status(400).json({ error: 'Please provide either city name or coordinates.' });
    }

    const { temperature, humidity, windSpeed } = weatherData.current;
    const recommendation = getRecommendation({ temperature, humidity, windSpeed }, cropName);

    res.json({
      ...weatherData,
      recommendation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
