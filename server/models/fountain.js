const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fountainSchema = new Schema({
  name: { type: String, unique: true },
  borough: String,
  lng: Number,
  lat: Number,
  fountains: { type: Number, default: 0 }
});

const Fountain = mongoose.model('Fountain', fountainSchema);

const getFountain = () => {
  return Fountain.find({});
};

const createEntry = ({ site_name, borough, drinking_fountains, lng, lat }) => {
  return Fountain.updateOne(
    { name: site_name },
    {
      name: site_name,
      borough,
      lng,
      lat,
      $inc: { fountains: drinking_fountains }
    },
    { upsert: true }
  );
};

module.exports = {
  getFountain,
  createEntry
};
