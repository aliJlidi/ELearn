//Require all the packages we need 
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const _ = require("lodash");
//use express to ease the work
const app = express();
// set the vew engine to ejs
app.set('view engine', 'ejs');
// use the bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//access to the style sheets and ressorces 
app.use(express.static("public"));
// intiate the varaibles
var fullName="";
mongoose.connect("mongodb://localhost:27017/eLearn",{useNewUrlParser : true });

// Create the user shcema and model 
// adding the neptune code 
const userSchema = {
    fullName : String,
    email : String,
    password : String,
    isSigned : Boolean
    };
    
    const User = new mongoose.model("User", userSchema);
// get the main page 
app.get("/", (req, res)=> {
    //checking if the user is already loged in 
    User.find({isSigned:true},function(err, foundPerson){
        if(foundPerson.length ==0 ){
            res.render("index");
 
        }
        else {
            res.render("LogedIn",{Name:foundPerson[0].fullName});
        }
  });
});
// get courses
app.get("/courses", (req, res)=> {
   //checking if the user is already loged in 
   User.find({isSigned:true},function(err, foundPerson){
    if(foundPerson.length ==0 ){
        res.render("courses");  

    }
    else {
        res.render("LogedIn",{Name:foundPerson[0].fullName});
    }

   });
});

// get signin
app.get("/signin", (req, res)=> {
    res.render("signin",{text:""});
    
});
// get signup
app.get("/signup", (req, res)=> {
    res.render("signup",{text:""});
    
});

// get signout 

app.get("/signout", (req, res)=> {
    //finding the logedIn user and switched to logedOut 
    User.findOneAndUpdate({isSigned:true}, {$set : {isSigned : false}},function(err, foundPerson){

    res.redirect("/");
    
});

});
//post the info from the signUp form to the database 

app.post("/signup" , function(req, res){
    const newUser = new User({
    fullName : req.body.fullName,
    email : req.body.email,
    password : req.body.password,
    isSigned : true 
    
    });
   fullName = req.body.fullName;
         //check if record exists
User.find({email:req.body.email},function(err, foundPerson){
    if(foundPerson.length ==0 ){
      //insert the data into the database
      newUser.save((err)=>err?console.log(err):res.render("logedIn",{Name: fullName}));
    }
    else{
        res.render("signup",{text: "This email is already registred"});
    }
  });



    
    });

// post login 
app.post("/login", function (req, res) {
            const username = req.body.email
            const password = req.body.password

            User.findOne({ email: username },function (err, foundUser){
                    if (!foundUser) {
                        res.render("Signin",{text:"This email is not signed In "});
                    } else {
                            if (foundUser.password === password) {
                                console.log("works");
                                User.findOneAndUpdate({email:foundUser.email}, {$set : {isSigned : true}},function(err, foundPerson){

                                    res.render("LogedIn",{Name:foundPerson.fullName});
                                    
                                });
                                
                             
                            
                        }
                    }
            });

        });


















app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });