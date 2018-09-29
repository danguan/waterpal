const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const morgan = require('morgan');
const controller = require('./controllers/controller.js');

const db = require('./database/mongoose.js');
const port = process.env.PORT || 3000;

const app = express();

// Express Middleware
app.use(parser.json());
app.use(cors());
app.use(morgan('dev'));
// End of Middleware

app.get('/fountain', controller.getFountain);
app.post('/fountain', controller.createEntry);

app.use(express.static(__dirname + '/../client/dist'))

app.listen(port, () => {
  console.log('Server connected on', port);
});
