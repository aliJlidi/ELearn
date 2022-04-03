const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
//use express to ease the work with requasts and responses
const app = express();
const async = require("async");
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
router.get('/profile', ensureAuthenticated,  function(req, res) {

// finding all the courses that the user subscribed to

User.findOne({neptuneCode:req.user.neptuneCode})
.select("courses neptuneCode firstName lastName progress")
    .populate('courses', 'title imgName')
    .exec()
    .then( docs => {
      //console.log(docs.courses); debugging
      res.render('profile',{
        firstName: req.user.firstName ,
        lastName : req.user.lastName,
        neptuneCode : req.user.neptuneCode,
        newListCourses : docs.courses
      });
      })
    
    .catch(err=>{
      console.log(err)
    });
    //console.log('Cookies: ', req.cookies)
  })

  
 



// python Course
router.get('/pythonCourse', ensureAuthenticated, function(req, res) {

  //finding all the lessons in a course 
  Course.findOne({title:"Python"}, function(err , foundCourse){
    if(foundCourse){
      res.render('Courses/python', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons
      })
    }
  })

}
);


// cplus Course
router.get('/C_PlusCourse', ensureAuthenticated, function(req, res) {

  //finding all the lessons in a course 
  Course.findOne({title:"C_Plus"}, function(err , foundCourse){
    if(foundCourse){
      res.render('Courses/cplus', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons
      })
    }
  })

}
);
// cplus Course
router.get('/C_SharpCourse', ensureAuthenticated, function(req, res) {

  //finding all the lessons in a course 
  Course.findOne({title:"C_Sharp"}, function(err , foundCourse){
    if(foundCourse){
      res.render('Courses/csharp', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons
      })
    }
  })

}
);
// java Course
router.get('/javaCourse', ensureAuthenticated, function(req, res) {

  //finding all the lessons in a course 
  Course.findOne({title:"Java"}, function(err , foundCourse){
    if(foundCourse){
      res.render('Courses/java', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons
      })
    }
  })

}
);
// web Course
router.get('/webCourse', ensureAuthenticated, function(req, res) {

  //finding all the lessons in a course 
  Course.findOne({title:"Web"}, function(err , foundCourse){
    if(foundCourse){
      res.render('Courses/web', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons
      })
    }
  })

}
);

// get Lesson depending on the id  
router.get('/:id', ensureAuthenticated, function(req, res) {
  console.log(req.params.id) //requausting the passed id 
 //finding all the lessons in a course 
 Course.findOne({lessons:{ $elemMatch : {href :req.params.id}}}, function(err , foundCourse){
   if(foundCourse){
     //console.log(foundCourse); //debugging
     var EmbedCode = "";
     var langType = req.params.id.substring(0,2);

     switch(langType){
       case 'py':
         embedCode ="#Your code under this line ";
         break;
       case 'cp':
         embedCode ="#include <iostream>\nusing namespace std;\nint main() {\n    //Your code under this line\n         cout << ;    return 0;\n}";
         break;
       case 'j_':
         embedCode = "class Main{\n    public static void main(String[] args) {\n		//Your code under this line \n        System.out.println();\n	}\n}";
         break;
       case 'cs':
         embedCode="using System;\nnamespace MyApp\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {            \n             //Your code under this line \n        Console. WriteLine();\n}\n    }\n}" ;
         break;
       default:
         embedCode=""
     }
     var lesson = foundCourse.lessons.filter(obj =>{return obj.href ===req.params.id});
     //console.log(lesson) //debugging
     res.render('editor', {
       course : foundCourse,
       lesson : lesson,
       editorText : embedCode
     })
   }
 })

}
);



module.exports = router;
