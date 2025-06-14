const express = require('express');
const router = express.Router();
const { getWeatherByCity, getWeatherByCoords } = require('../services/weatherAPI');
const { getAIRecommendation } = require('../services/recommendation');

const notes = []; // In-memory storage for notes (temporary)

// GET /notes — render the notes page
router.get('/', (req, res) => {
  res.render('notes', { notes });
});

// POST /notes — handle new note submission
router.post('/', async (req, res) => {
  const { note, city, crop, lat, lon } = req.body;

  try {
    let weatherData;

    // Determine how to fetch weather data: by coordinates or city
    if (lat && lon) {
      weatherData = await getWeatherByCoords(lat, lon);
    } else if (city) {
      weatherData = await getWeatherByCity(city);
    } else {
      return res.status(400).send('Missing location data');
    }

    const { temperature, humidity, windSpeed } = weatherData.current;

    // Generate AI recommendation based on weather + crop
    const recommendation = await getAIRecommendation(
      { temperature, humidity, windSpeed },
      crop
    );

    // Build note object
    const entry = {
      timestamp: new Date(),
      crop,
      city: weatherData.city,
      weather: weatherData.current,
      note,
      recommendation
    };

    notes.push(entry); // Save note in memory

    // Redirect to notes page to show all logs
    res.redirect('/notes');
  } catch (err) {
    console.error('Error saving note:', err.message);
    res.status(500).send('Failed to process your request.');
  }
});

module.exports = router;
