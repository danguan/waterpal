const mongoose = require('mongoose')
const Schema = mongoose.Schema

let fountainSchema = new Schema({
  name: { type: String, unique: true },
  borough: String,
  fountains: { type: Number, default: 0 }
})

const Fountain = mongoose.model('Fountain', fountainSchema)

// const getFountain = (labels, cb) => {
//   Inventory.find({ labels })
//     .limit(20)
//     .exec((err, results) => {
//       if (err) cb(err)

//       cb(null, results)
//     })
// }

const createEntry = (
  { site_name, borough, drinking_fountains },
  cb
) => {
  new Fountain({
    name: site_name,
    borough,
    fountains: drinking_fountains
  })
    .save()
    .catch(err => {
      cb(err)
      // Fountain.update({ name: site_name }, { $inc: { fountains: drinking_fountains } })
    })
    .then(response => {
      cb(null, response)
    })
}

module.exports = {
  createEntry,
  Fountain
}