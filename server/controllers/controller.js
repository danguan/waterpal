const fountain = require('../models/fountain.js')

module.exports = {
  fountain: {
    // getFountain: (req, res) => {
      //
    // },
    createEntry: (req, res) => {
      console.log(req.body)
      
      fountain.createEntry(req.body, (err, result) => {
        if (err) res.status(404).send('Error creating entry')

        res.send(result)
      })
    }
  }
}