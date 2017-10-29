var express = require('express');
var authorization = require('../libs/authentication');
var config = require('../config/config');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: config.appname });
});

module.exports = router;
