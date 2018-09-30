const axios = require('axios');
const { gMapsAPI } = require('../../config.js');

const getLongLat = loc => {
  return new Promise((resolve, reject) => {
    let address = loc + ' NYC';
    axios
      .post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gMapsAPI}`
      )
      .then(({ data }) => {
        resolve({
          address: data.results[0].formatted_address,
          lng: data.results[0].geometry.location.lng,
          lat: data.results[0].geometry.location.lat
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  getLongLat
};
