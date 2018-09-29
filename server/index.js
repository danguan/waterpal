const express = require('express')
const controller = require('./controllers/controller.js')
const morgan = require ('morgan')
const cors = require ('cors')

const db = require('./database/mongoose.js')
const port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/../client/dist'))
app.post('/fountain', controller.fountain.createEntry)

app.listen(port, () => {
  console.log('Server connected on', port)
})