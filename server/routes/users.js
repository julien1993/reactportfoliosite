const express = require('express');
const router = express.Router();

const User = require('../models/usermodel');
const RandomKey = require('../models/randomkeymodel');
const authentication = require('../libs/authentication');
const mailUtil = require('../libs/mailUtil');
const PasswordKey = require('../models/passwordkeymodel');

router.post("/register", (req, res) => {
  var generatedKey = undefined;
  let firstName = req.body.firstName;
  let surname = req.body.surname;
  let email = req.body.email;
  let confirmEmail = req.body.confirmEmail;
  if (firstName && surname && email && confirmEmail) {
    if (email == confirmEmail) {
      User.findOne({
        email: email
      }, (error, result) => {
        if (error) {
          return res.send({error: error});
        } else if (result === null) {
          var userData = new User();
          userData.email = email;
          userData.firstName = firstName;
          userData.surname = surname;
          userData.password = " ";
          userData.active = false;
          userData.permissionLevel = 0;
          userData.username = email;
          userData.save(function(error, user) {
            if (error) {
              return res.send({error: error});
            } else {
              mailUtil(req, res, generatedKey => {
                var random = new RandomKey();
                random.userEmail = userData.email;
                random.key = generatedKey;
                console.log(random);
                random.save(function(error, result) {
                  if (error) {
                    res.send({error: error});
                  }
                });
              });
              res.send({payload: "user created"});
            }
          });
        } else {
          res.send({error: "this user already exists"});
        }
      });
    }
  }
});

router.post('/login', function(req, res) {
  if (req.body.logEmail && req.body.logPassword) {
    User.authenticate(req.body.logUsername, req.body.logPassword, function(error, user) {
      if (error || !user) {
        return res.send({error: "Wrong email or password."});
      } else {
        req.session.email = user.email;
        req.session.username = user.username;
        req.session.permissionLevel = user.permissionLevel;
        return res.send({payload: req.session});
      }
    });
  } else {
    return res.send({error: "All fields required."});
  }
});

router.get("/validate", (req, res) => {
  let email = req.query.email;
  let key = req.query.key;
  RandomKey.findOne({
    $and: [
      {
        key: key
      }, {
        userEmail: email
      }
    ]
  }, (error, result) => {
    if (error) {
      return error;
    } else if (result !== null) {
      // console.log(result);
      User.findOne({
        email: email
      }, (error, result) => {
        if (error) {
          return res.send({error: error});
        } else {
          req.session.email = result.email;
          req.session.firstName = result.firstName;
          req.session.surname = result.surname;
          res.send({payload: req.session});
        }
      });
    } else {
      return res.send({error: "could not find randomKey"})
    }
  });
});

router.post("/completesignup/:username", function(req, res) {
  var newUsername = req.params.username;
  var newPassword = req.body.password;
  var newFirstName = req.body.firstName;
  var newSurname = req.body.surname;
  User.findOneAndUpdate({username:req.params.username}, {$set:{username:newUsername, password:newPassword, firstName:newFirstName, surname:newSurname}}, {new:true}, function(err, result) {
    if(err) {
      res.send({error:err})
    }
    res.send({payload:result});
  });
});

router.get("/", authentication.requiresLevel5, function(req, res) {
  User.find(function(err, result) {
    if (err) {
      return res.send({error:err});
    }
    res.send({payload:result});
  });
});

router.get("/:username", authentication.requiresLevel5OrSelf, function(req, res) {
  User.findOne(function(err, result) {
    if (err) {
      return res.send({error:err});
    }
    res.send({payload:result});
  });
});

router.post("/:username", authentication.requiresLevel5OrSelf, function(req, res) {
  var newUsername = req.params.username;
  var newPassword = req.body.password;
  var newFirstName = req.body.firstName;
  var newSurname = req.body.surname;
  User.findOneAndUpdate({username:req.params.username}, {$set:{username:newUsername, password:newPassword, firstName:newFirstName, surname:newSurname}}, {new:true}, function(err, result) {
    if(err) {
      res.send({error:err})
    }
    res.send({payload:result});
  });
});

router.get("/remove/:username", authentication.requiresLevel5OrSelf, function(req, res) {
  User.findOneAndRemove({username:req.params.username}, function (err, result) {
    if(err) {
      res.send({error:err});
    }
    res.send({payload:result});
  });
});

router.get("/validatepasswordkey", (req, res) => {
  let email = req.query.email;
  let key = req.query.key;
  PasswordKey.findOne({
    $and: [
      {
        key: key
      }, {
        userEmail: email
      }
    ]
  }, (error, result) => {
    if (error) {
      return error;
    } else if (result !== null) {
      // console.log(result);
      User.findOne({
        email: email
      }, (error, result) => {
        if (error) {
          return res.send({error: error});
        } else {
          req.session.email = result.email;
          req.session.username = result.username;
          req.session.firstName = result.firstName;
          req.session.surname = result.surname;
          res.send({payload: req.session});
        }
      });
    } else {
      return res.send({error: "could not find Password Key"})
    }
  });
});

router.post("/recoverpassword/:username", authentication.requiresLevel5OrSelf, function(req, res) {
  var newPassword = req.body.password;
  User.findOneAndUpdate({username:req.params.username}, {$set:{password:newPassword}}, {new:true}, function(err, result) {
    if(err) {
      res.send({error:err})
    }
    res.send({payload:result});
  });
});

module.exports = router;
