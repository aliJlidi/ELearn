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
const Progress = require('../models/Progress');

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
   var progress;
    if(foundCourse){
      isUserSubscribed = foundCourse.users.includes(req.user._id);
      // retrieve progress on course selection if exist
      Progress.findOne({user:req.user._id ,subject:foundCourse._id}, (err, foundProgress)=>{
            if(!foundProgress){
              console.log("There are no progress found");
            } 

            try {
              progress = foundProgress.value;
            }
            catch(exception_var){
              console.log(exception_var)
            }
            
            

            console.log(progress) //debugging

            res.render('Courses/python', {
              Name: req.user.firstName ,
              newListLessons : foundCourse.lessons,
              IsSubscribed : isUserSubscribed,
              Progress: progress
            })
            
      })
 
    }
  })

});

// increament python Course progress 
router.get('/incPython', ensureAuthenticated, function(req, res) {
  Course.findOne({title:"Python"}, function(err , foundCourse){
    if(foundCourse){
      // retrieve progress on course selection if exist
      Progress.updateOne({user:req.user._id ,subject:foundCourse._id},{$inc : {value: 1}}, (err, result)=>{
            if(err) console.log("something wron with increamntation");
            
               });

              }
          
       });
  });

// cplus Course
router.get('/C_PlusCourse', ensureAuthenticated, function(req, res) {
   var progress;
  //finding all the lessons in a course 
  Course.findOne({title:"C_Plus"}, function(err , foundCourse){
    if(foundCourse){
      isUserSubscribed = foundCourse.users.includes(req.user._id);
      
            // retrieve progress on course selection if exist
            Progress.findOne({user:req.user._id ,subject:foundCourse._id}, (err, foundProgress)=>{
              if(!foundProgress) console.log("There are no progress found")
              progress = foundProgress.value;
              console.log(progress);
        })
      res.render('Courses/cplus', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons,
        IsSubscribed : isUserSubscribed,
        currentProgress: progress
      })
    }
  })

}
);
// cplus Course
router.get('/C_SharpCourse', ensureAuthenticated, function(req, res) {
   var progress;
  //finding all the lessons in a course 
  Course.findOne({title:"C_Sharp"}, function(err , foundCourse){
    if(foundCourse){
      isUserSubscribed = foundCourse.users.includes(req.user._id);
            // retrieve progress on course selection if exist
            Progress.findOne({user:req.user._id ,subject:foundCourse._id}, (err, foundProgress)=>{
              if(!foundProgress) console.log("There are no progress found")
              progress = foundProgress.value;
              console.log(progress);
        })
      res.render('Courses/csharp', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons,
        IsSubscribed : isUserSubscribed,
        currentProgress: progress
      })
    }
  })

}
);
// java Course
router.get('/javaCourse', ensureAuthenticated, function(req, res) {
   var progress
  //finding all the lessons in a course 
  Course.findOne({title:"Java"}, function(err , foundCourse){
    if(foundCourse){
      isUserSubscribed = foundCourse.users.includes(req.user._id);
            // retrieve progress on course selection if exist
            Progress.findOne({user:req.user._id ,subject:foundCourse._id}, (err, foundProgress)=>{
              if(!foundProgress) console.log("There are no progress found")
              progress = foundProgress.value;
              console.log(progress);
        })
      res.render('Courses/java', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons ,
        IsSubscribed : isUserSubscribed,
        currentProgress: progress
      })
    }
  })

}
);
// web Course
router.get('/webCourse', ensureAuthenticated, function(req, res) {
   var progress 
  //finding all the lessons in a course 
  Course.findOne({title:"Web"}, function(err , foundCourse){
    if(foundCourse){
      isUserSubscribed = foundCourse.users.includes(req.user._id);
            // retrieve progress on course selection if exist
            Progress.findOne({user:req.user._id ,subject:foundCourse._id}, (err, foundProgress)=>{
              if(!foundProgress) console.log("There are no progress found")
              progress = foundProgress.value;
              console.log(progress);
        })
      res.render('Courses/web', {
        Name: req.user.firstName ,
        newListLessons : foundCourse.lessons,
        IsSubscribed : isUserSubscribed,
        currentProgress: progress
      })
    }
  })

}
);



// get Lesson depending on the id  
router.get('/:id', ensureAuthenticated, function(req, res) {
  var progress;
  console.log(req.params.id) //requausting the passed id 
 //finding all the lessons in a course 
 Course.findOne({lessons:{ $elemMatch : {href :req.params.id}}}, function(err , foundCourse){
   if(foundCourse){
    Progress.findOne({user:req.user._id ,subject:foundCourse._id}, (err, foundProgress)=>{
      if(!foundProgress) console.log("There are no progress found")
      progress = foundProgress.value;
    });
     //console.log(foundCourse); //debugging
     var EmbedCode = "";
     var langType = req.params.id.substring(0,2);
     var nextLessonNum = (Number(req.params.id.substring(req.params.id.length-1)) + 1).toString();
     var nextLessonId = req.params.id.substring(0,5) + nextLessonNum;

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
     
     res.render('editor', {
       course : foundCourse,
       lesson : lesson,
       editorText : embedCode,
       lessonId : nextLessonId,
       currentProgress: progress
     })
   }
 })

}
);







//enroll to a lesson 
router.post('/enroll', ensureAuthenticated, function(req, res) {
  Course.findOne({title:req.body.title}, function(err , foundCourse){
    if(foundCourse){
      // found user and add the course to him 
      User.findOne({neptuneCode:req.user.neptuneCode},(err, foundUser)=>{
        console.log(foundUser.courses);
        foundUser.courses.push(foundCourse._id)
        foundUser.save();
        // Initialize progress 
        Progress.create({user:foundUser._id ,subject:foundCourse._id,value:0},(err, result)=>{
          if(err) console.log("something wrong with initalizing the progress");
          console.log("progress initialized");
        })
      })
      isUserSubscribed = foundCourse.users.includes(req.user._id);
      if(isUserSubscribed){
        //this will never happen just in debugging
        console.log("already subscribed")
      }
      else{
        // found the course and add the user to it 
        foundCourse.users.push(req.user._id)
        foundCourse.save();
        
        console.log("user subscribed")
        isUserSubscribed = foundCourse.users.includes(req.user._id);
        var courseTitle = req.body.title;
        if(courseTitle=='C_Plus'){
          courseTitle = 'cplus'
        }
        if(courseTitle=='C_Sharp'){
          courseTitle = 'csharp'
        }
        if(courseTitle=='Python'){
          courseTitle = 'python'
        }
        if(courseTitle=='Java'){
          courseTitle = 'java'
        }
        if(courseTitle=='Web'){
          courseTitle = 'web'
        }
        req.flash('success_msg', 'You are subscribed ');
        res.render('Courses/'+courseTitle, {
          Name: req.user.firstName ,
          newListLessons : foundCourse.lessons,
          IsSubscribed : isUserSubscribed,
          Progress : 0
        })
      }
    
    
    
    
    }
  })

});


module.exports = router;
