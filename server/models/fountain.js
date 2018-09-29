const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fountainSchema = new Schema({
  name: { type: String, unique: true },
  borough: String,
  fountains: { type: Number, default: 0 }
});

const Fountain = mongoose.model('Fountain', fountainSchema);

const getFountain = ({ name }, cb) => {
  Fountain.find({ name })
    .exec((err, results) => {
      if (err) cb(err)

      cb(null, results)
    })
}

const createEntry = ({ site_name, borough, drinking_fountains }, cb) => {
  Fountain.update(
    { name: site_name },
    { name: site_name, borough, $inc: { fountains: drinking_fountains } },
    { upsert: true }
  )
    .catch(err => {
      console.error('Error creating entry:', err.errmsg);
      cb(err);
    })
    .then(response => {
      cb(null, response);
    });
};

module.exports = {
  getFountain,
  createEntry
};
