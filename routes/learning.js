const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
//use express to ease the work with requasts and responses
const app = express();
//access to the style sheets and ressorces 
app.use(express.static("public"));
const Course = require('../models/Courses');
const User = require ('../models/User');
// EJS
app.use(expressLayouts);
// set the view engine to ejs
app.set('view engine', 'ejs');

router.get('/courses', forwardAuthenticated, (req, res) => res.render('courses'));

// profile
router.get('/profile', ensureAuthenticated, function(req, res) {

// finding all the courses that the user subscribed to

User.findOne({neptuneCode:req.user.neptuneCode}, function(err , foundUser){
  if(foundUser){
    
    /*console.log(foundUser.courses[0].title);  debugging */
  
    res.render('profile', {
      firstName: req.user.firstName ,
      lastName : req.user.lastName,
      neptuneCode : req.user.neptuneCode,
      newListCourses : foundUser.courses
    })
  }
})


}
);

// python Course
router.get('/pythonCourse', ensureAuthenticated, function(req, res) {

  //finding all the lessons in a course 
  Course.findOne({title:"Python"}, function(err , foundCourse){
    if(foundCourse){
      res.render('python', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons
      })
    }
  })

}
);
// python Lesson 
router.get('/py_l_1', ensureAuthenticated, function(req, res) {

  //finding all the lessons in a course 
  Course.findOne({title:"Python"}, function(err , foundCourse){
    if(foundCourse){
      res.render('editor', {
        
        newListLessons : foundCourse.lessons
      })
    }
  })

}
);


module.exports = router;
