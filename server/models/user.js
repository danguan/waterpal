const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, unique: true, sparse:true},
  password: { type: String},
  intake: {type: Number}
});

const User = mongoose.model('User', userSchema);

const getUser = (id) => {
  return User.findById(id);
};

const createUser = ({ username, password }) => {
  return User.findOne({username}).then(user=>{
    if(!user){
      throw new Error("User already exist")
    }else{
      return User({username,password}).save()
    }
  })
};

module.exports = {
  getUser,
  createUser
};
