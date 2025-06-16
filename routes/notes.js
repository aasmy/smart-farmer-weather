const express = require('express');
const router = express.Router();
const { getWeatherByCity, getWeatherByCoords } = require('../services/weatherAPI');
const { getAIRecommendation } = require('../services/recommendation');

// Render notes page
router.get('/', (req, res) => {
  if (!req.session.notes) {
    req.session.notes = [];
  }

  res.render('notes', { notes: req.session.notes });
});

// Add a new note
router.post('/', async (req, res) => {
  if (!req.session.notes) {
    req.session.notes = [];
  }

const { title, note, city, crop, lat, lon, userInput } = req.body;

  try {
    let weatherData;

    if (lat && lon) {
      weatherData = await getWeatherByCoords(lat, lon);
    } else if (city) {
      weatherData = await getWeatherByCity(city);
    } else {
      return res.status(400).send('Missing location data');
    }

    const { temperature, humidity, windSpeed, condition } = weatherData.current;

    const recommendation = await getAIRecommendation(
      { temperature, humidity, windSpeed },
      crop
    );

    const newNote = {
      title: title || 'Untitled',
      note,
      userInput: userInput || '',
      crop,
      city: weatherData.city,
      weather: {
        temperature,
        condition
      },
      recommendation,
      timestamp: new Date().toLocaleString()
    };

    req.session.notes.push(newNote);

    res.redirect('/notes');
  } catch (err) {
    console.error('Error saving note:', err.message);
    res.status(500).send('Failed to process your request.');
  }
});

// Delete a note by index
router.post('/delete', (req, res) => {
  const { index } = req.body;

  if (!req.session.notes || isNaN(index)) {
    return res.redirect('/notes');
  }

  req.session.notes.splice(index, 1);
  res.redirect('/notes');
});

// Serve note for editing (not used in inline editing)
router.get('/edit', (req, res) => {
  const { index } = req.query;

  if (!req.session.notes || isNaN(index) || !req.session.notes[index]) {
    return res.redirect('/notes');
  }

  const noteToEdit = req.session.notes[index];
  res.render('editNote', { note: noteToEdit, index });
});

// Handle inline update of a note
router.post('/edit', express.json(), (req, res) => {
  const { index, title, note } = req.body;

  if (!req.session.notes || isNaN(index) || !req.session.notes[index]) {
    return res.status(400).send('Invalid index');
  }

  const existing = req.session.notes[index];
  req.session.notes[index] = {
    ...existing,
    title,
    note,
    timestamp: new Date().toLocaleString()
  };

  res.sendStatus(200);
});

module.exports = router;
