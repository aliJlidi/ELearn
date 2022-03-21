//Require all the packages we need 
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const LocalStrategy = require('passport-local');
//Passport is authentication middleware for Node.js. 
const passport = require("passport");

// Passport Config
require('./config/passport')(passport);

const passportLocalMongoose = require("passport-local-mongoose");
//const _ = require("lodash");
const flash = require('connect-flash');
//use express to ease the work with requasts and responses
const app = express();

// EJS
app.use(expressLayouts);
// set the view engine to ejs
app.set('view engine', 'ejs');


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// use the bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));

//access to the style sheets and ressorces 
app.use(express.static("public"));

// use .env to protect current project in github
require("dotenv").config();
// intiate the varaibles
var fullName = "";
//initiate session entities 
// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
//mongoose.set("useCreateIndex",true);
mongoose.connect("mongodb://localhost:27017/eLearn", {
    useNewUrlParser: true
});



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/learning', require('./routes/learning.js'));





// server Listening on local Host or port defined by the domain 

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});