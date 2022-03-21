const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
//use express to ease the work with requasts and responses
const app = express();
//access to the style sheets and ressorces 
app.use(express.static("public"));

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));
router.get('/courses', forwardAuthenticated, (req, res) => res.render('courses'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    Name: req.user.firstName 
  })
);

module.exports = router;