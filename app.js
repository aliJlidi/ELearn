//Require all the packages we need 
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
var cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local');
//Passport is authentication middleware for Node.js. 
const passport = require("passport");

//use ajax in the client side 
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);
// Passport Config
require('./config/passport')(passport);

const passportLocalMongoose = require("passport-local-mongoose");
//const _ = require("lodash");
const flash = require('connect-flash');
//use express to ease the work with requasts and responses
const app = express();
app.use(cookieParser())
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
app.use('/courses', require('./routes/courses.js'));
app.use('/lessons', require('./routes/lessons.js'));
app.use('/compiler', require('./routes/compiler.js'));





// server Listening on local Host or port defined by the domain 

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});