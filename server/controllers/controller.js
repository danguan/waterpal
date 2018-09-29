const fountain = require('../models/fountain.js');
const geocoding = require('../helpers/geocoding.js');

module.exports = {
  getFountain: (req, res) => {
    fountain
      .getFountain(req.query.name)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send('Error finding fountain', err);
      });
  },
  createEntry: (req, res) => {
    fountain
      .createEntry(req.body)
      .then(data => {
        res.send('Created entry');
      })
      .catch(err => {
        res.status(404).send('Error creating entry:', err);
      });
  },
  getLongLat: (req, res) => {
    geocoding
      .getLongLat(req.query.site_name)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
