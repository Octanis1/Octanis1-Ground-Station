var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 


//routes
var routes = require('./routes/index');
var users = require('./routes/users');
var heartbeats = require('./routes/heartbeats');
var lorawan_packets = require('./routes/lorawan_packets')


var app = express();
app.set('port', process.env.PORT);
app.set('env', 'development');

//app routes
app.use('/', routes);
app.use('/users', users);
app.use('/heartbeats', heartbeats);
app.use('/lorawan_packets', lorawan_packets);


//mongodb connection 
mongoose.connect('mongodb://'+process.env.MONGODB_ADDON_USER+':'+process.env.MONGODB_ADDON_PASSWORD+'@'+process.env.MONGODB_ADDON_HOST+':'+process.env.MONGODB_ADDON_PORT+'/'+process.env.MONGODB_ADDON_DB); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); 
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
