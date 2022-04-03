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







  module.exports = router;