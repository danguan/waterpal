const axios = require('axios');

const fountain_data = require('../../data/fountains_ny.js');

fountain_data.forEach((detail, ind) => {
  setTimeout(() => {
    axios
      .get('http://localhost:3000/longlat', { params: detail })
      .then(response => {
        axios
          .post(
            'http://localhost:3000/fountain',
            Object.assign(response.data, detail)
          )
          .then(result => {
            console.log(result.data);
          })
          .catch(err => {
            console.error('Error creating fountain entry');
          });
      })
      .catch(err => {
        console.error('Error getting longitude and latitude', detail.site_name);
      });
  }, 500 * ind);
});