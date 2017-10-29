const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

module.exports=requiresLogin
