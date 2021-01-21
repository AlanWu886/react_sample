const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique : true,
    dropDups: true
  },
  password:{
    type: String,
    required: true,
    unique : true,
    dropDups: true
  },
  email:{
    type: String,
    required: true,
    unique : true,
    dropDups: true
  }
},
{ timestamp:true });

const User = mongoose.model('User', userSchema);
module.exports = User;
