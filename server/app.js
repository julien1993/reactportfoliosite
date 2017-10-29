require("dotenv").config();

const express = require("express");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const path = require('path');

const config = require("./config/config");

const index = require("./routes/index");
const users = require("./routes/users");

const app = express();

mongoose.connect(`${config.db.protocol}://${config.db.username}:${config.db.password}@${config.db.url}:${config.db.port}/${config.db.name}`, { useMongoClient: true });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('partials', path.join(__dirname, 'views/partials'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: `${config.sessionsecret}`,
  resave: true,
  saveUninitialized: false
}));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
