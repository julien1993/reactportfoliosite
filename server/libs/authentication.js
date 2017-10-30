const express = require('express');
const router = express.Router();

function requiresLevel1(req, res, next) {
  if (req.session.authenticationLevel>=1) {
    return next();
  } else {
    var err = new Error('You must be at least level 1 to access this page');
    err.status = 401;
    return next(err);
  }
}

function requiresLevel2(req, res, next) {
  if (req.session.authenticationLevel>=2) {
    return next();
  } else {
    var err = new Error('You must be at least level 2 to access this page');
    err.status = 401;
    return next(err);
  }
}

function requiresLevel3(req, res, next) {
  if (req.session.authenticationLevel>=3) {
    return next();
  } else {
    var err = new Error('You must be at least level 3 to access this page');
    err.status = 401;
    return next(err);
  }
}

function requiresLevel4(req, res, next) {
  if (req.session.authenticationLevel>=4) {
    return next();
  } else {
    var err = new Error('You must be at least level 4 to access this page');
    err.status = 401;
    return next(err);
  }
}

function requiresLevel5(req, res, next) {
  if (req.session.authenticationLevel>=5) {
    return next();
  } else {
    var err = new Error('You must be at least level 5 to access this page');
    err.status = 401;
    return next(err);
  }
}

function requiresLevel5OrSelf(req, res, next) {
  if (req.session.authenticationLevel>=5 || req.session.userName == req.params.username) {
    return next();
  } else {
    var err = new Error('You must be either Level 5 or the same user to access this page');
    return next(err);
  }
}

module.exports= {requiresLevel1, requiresLevel2, requiresLevel3, requiresLevel4, requiresLevel5, requiresLevel5OrSelf}
