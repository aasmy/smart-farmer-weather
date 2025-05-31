// routes/weather.js
const express = require('express');
const router = express.Router();
const { getWeatherByCity } = require('../services/weatherAPI');

// GET /weather?city=CityName
router.get('/', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const weatherData = await getWeatherByCity(city);
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;