const fountain = require('../models/fountain.js');
const user = require('../models/user.js');
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
    console.log(req.query.site_name)
    geocoding
      .getLongLat(req.query.site_name)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  createUser: (req, res) => {
    user.createUser(req.body)
    .then(data => {
      res.send({login: true, username: req.body.username})
    })
    .catch(err => {
      console.error(err)
    })
  }
};
