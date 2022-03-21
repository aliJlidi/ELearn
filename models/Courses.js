const mongoose = require('mongoose');

const schema = new mongoose.Schema;

const CourseSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true
  },
  imgName: {
    type: String,
    required: true
  },
  lessons: [
    {
      title:{
        type: String,
        required: true
      },
      href:{
        type: String,
        required:true 
      },
      contenant : {
        type: String,
        required: true
      },
      Exercice : {
        type: String,
        required: true
      }
    }
      
 
  ],
  users:[{type: mongoose.Schema.Types.ObjectId , ref : "User" }]
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;