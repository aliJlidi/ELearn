const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

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
  courses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    title:{
      type: String,
      required : true
    },
    imgName:{
      type: String

    },
    progress: {
      type: Number
    }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;