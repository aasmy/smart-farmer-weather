const express = require('express');
const router = express.Router();
const { getWeatherByCity } = require('../services/weatherAPI');
const { getRecommendation } = require('../services/recommendation');

// GET /weather?city=sakarya&crop=tomato
router.get('/', async (req, res) => {
  const city = req.query.city;
  const crop = req.query.crop || 'tomato'; // default to tomato if no crop specified

  if (!city) {
    return res.status(400).json({ error: 'Please specify a city using ?city=' });
  }

  try {
    const weatherData = await getWeatherByCity(city);

    // extract only what we need for recommendation
    const { temperature, humidity, windSpeed } = weatherData.current;

    const recommendation = getRecommendation(
      { temperature, humidity, windSpeed },
      crop
    );

    res.json({
      ...weatherData,
      recommendation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
