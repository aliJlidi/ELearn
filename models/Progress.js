const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId ,
         ref : "User" },

    subject : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },

    value : {
        type: Number
      }

})

const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = Progress;