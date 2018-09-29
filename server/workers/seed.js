const axios = require('axios');

const fountain_data = require('../../data/fountains_ny.js');

axios.get('http://localhost:3000/fountain', {
  params: { name: fountain_data[0].site_name }
}) 

axios
  .post('http://localhost:3000/fountain', fountain_data[0])
  .then(response => {
    console.log(response.data);
  })
  .catch(err => {
    console.error('Error with POST request:', err.response.statusText);
  });