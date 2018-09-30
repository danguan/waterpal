const express = require('express');
const cors = require('cors');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');
const {
  getFountain,
  createEntry,
  getLongLat,
  getNearby,
  createUser
} = require('./controllers/controller.js');

const db = require('./database/mongoose.js');
const port = process.env.PORT || 3000;

const app = express();

// Express Middleware
app.use(parser.json());
app.use(cors());
app.use(morgan('dev'));
// End of Middleware

// GET requests
app.get('/fountain', getFountain);
app.get('/longlat', getLongLat);
app.get('/nearby', getNearby);
// End

// POST requests
app.post('/user', createUser);
app.post('/fountain', createEntry);
// End

app.use(express.static(__dirname + '/../client/dist'));
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../client/dist/index.html'));
});

app.listen(port, () => {
  console.log('Server connected on', port);
});
