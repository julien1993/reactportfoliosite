const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const app = express();

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mentorcrm2017@gmail.com",
    pass: "soctrolls123"
  }
});

var rand, mailOptions, host, link;
// we need to save the random number in randomkey collection
//we need to save userId in the randomkey collection

var sendVerificationEmail = function(req, res, callback) {
  rand = new Date();
  rand = rand+req.body.email;
  key = hashCode(rand);
  //hashing must solve
  callback(key);
  // console.log(key);
  host = req.get("host");
  link =
    "http://" +
    req.get("host") +
    "/users/validate/?key=" +
    key +
    "&email=" +
    req.body.email;
  mailOptions = {
    to: req.body.email,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
  };
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      res.end("error");
    } else {
      res.end("sent");
    }
  });
};

hashCode = function(input) {
  var hash = 0, i, chr;
  if (input.length === 0) return hash;
  for (i = 0; i < input.length; i++) {
    chr   = input.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

module.exports = sendVerificationEmail;
