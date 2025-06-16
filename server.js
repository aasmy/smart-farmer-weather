const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const weatherRoutes = require('./routes/weather');
const notesRouter = require('./routes/notes');
const f = require('session-file-store');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  name: 'smart-session-id', 
  store: new FileStore({
    path: './sessions',
    retries: 1
  }),
  secret: 'smart-farmer-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, // 1 hour
    httpOnly: false, 
  }
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/weather', weatherRoutes);
app.use('/notes', notesRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
