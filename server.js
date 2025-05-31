// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weather');


dotenv.config(); 

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));

   

app.use('/weather', weatherRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
