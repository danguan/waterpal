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

const getNearby = (lat, lng) => {
  lng = Number(lng);
  lat = Number(lat);
  return Fountain.find({
    $or: [
      {
        lat: {
          $lt: lat + 0.01,
          $gt: lat - 0.01
        },

        lng: {
          $lt: lng + 0.01,
          $gt: lng - 0.01
        }
      }
    ]
  });
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
  getNearby,
  createEntry
};
