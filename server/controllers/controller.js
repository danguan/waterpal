const fountain = require('../models/fountain.js');

module.exports = {
  getFountain: (req, res) => {
    fountain.getFountain(req.body, (err, result) => {
        if (err) res.status(404).send('Error finding entry');

        res.send(result);
      });
  },
  createEntry: (req, res) => {
    fountain.createEntry(req.body, (err, result) => {
      if (err) res.status(404).send('Error creating entry');

      res.send('Created entry:', result.n);
    });
  }
};
