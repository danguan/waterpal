const mongoose = require('mongoose')
const { fountainURI } = require('../../config.js')

// Fountain DB
mongoose.connect(fountainURI)
let fountainDB = mongoose.connection
fountainDB.on('error', err => {
  if (err) console.error('Error connecting to inventory database')
})
fountainDB.once('open', () => {
  console.log('Connected to MongoDB')
})
