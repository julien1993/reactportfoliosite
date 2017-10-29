const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const User = require('../models/usermodel');
const authentication = require('../libs/authentication');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/login', function(req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf && req.body.firstname && req.body.surname) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
	  surname: req.body.surname
    }

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/cpanel');
      }
    });

  } else if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/cpanel');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

router.get('/cpanel', authentication, function (req, res) {
	res.send('the control panel');
});

module.exports = router;
