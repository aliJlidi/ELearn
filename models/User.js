const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,

  neptuneCode: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number
  },
  courses: [{
    type : mongoose.Schema.Types.ObjectId,
    ref:"Course"
     
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;