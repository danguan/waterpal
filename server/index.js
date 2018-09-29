const express = require('express')
const controller = require('./controllers/controller.js')

const db = require('./database/mongoose.js')
const port = process.env.PORT || 3000

const app = express()

app.post('/fountain', controller.fountain.createEntry)

app.listen(port, () => {
  console.log('Server connected on', port)
})