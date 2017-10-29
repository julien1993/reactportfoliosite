const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const RandomKey = require('../models/randomkeymodel');
const authentication = require('../libs/authentication');
const mailUtil = require('../libs/mailUtil');

router.post("/register", (req, res, next) => {
  console.log("im in register");
  var generatedKey = undefined;

  let firstName = req.body.firstName;
  let surname = req.body.surname;
  let email = req.body.email;
  let confirmEmail = req.body.confirmEmail;

  if (firstName && surname && email && confirmEmail) {
    if (email == confirmEmail) {
      User.findOne(
        {
          email: email
        },
        (error, result) => {
          if (error) {
            return error;
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
                return next(error);
                console.log(error);
              } else {
                mailUtil(req, res, generatedKey => {
                  // console.log("im here" + generatedKey);
                  var random = new RandomKey();
                  random.userEmail = userData.email;
                  random.key = generatedKey;
                  console.log(random);
                  random.save(function(error, result) {
                    if (error) {
                      res.send({error: "Failure in email sending"});
                    }
                  });
                });
                res.send({ payload: "user created" });

                // return res.redirect("/cpanel");
              }
            });
          } else {
            console.log("this Email address is already exist");
            res.send({ error: "this user already exists" });
          }
        }
      );
    }
  }
});

router.post('/login', function(req, res, next) {
  if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.send({payload: "success"});
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});

router.get("/validate", (req, res) => {
  let email = req.query.email;
  let key = req.query.key;

  RandomKey.findOne(
    {
      $and: [
        {
          key: key
        },
        {
          userEmail: email
        }
      ]
    },
    (error, result) => {
      if (error) {
        return error;
      } else if (result !== null) {
        // console.log(result);
        User.findOne(
          {
            email: email
          },
          (error, result) => {
            if (error) {
              return error;
            } else {
              req.session.email = result.email;
              req.session.id = result._id;
              req.session.firstName = result.firstName;
              req.session.surname = result.surname;
              res.redirect("/continuesignup");
            }
          }
        );
      } else {
        console.log("could not find");
      }
    }
  );
});

router.get('/cpanel', authentication, function (req, res) {
	res.send('the control panel');
});

module.exports = router;
