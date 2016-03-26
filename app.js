var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');


//Accept UDP datagrams for LoRaWAN

/*
var PORT = 1780;
var HOST = '0.0.0.0';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
});

server.bind(PORT, HOST);
*/

//routes
var routes = require('./routes/index');
var lorawan_packets = require('./routes/lorawan_packets');
var rockblock_packets = require('./routes/rockblock_packets');
var gsm_packets = require('./routes/gsm_packets');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', process.env.PORT);
app.set('env', 'development');
app.use(logger('dev'));

//enable all cors requests
app.use(cors());


//app routes
app.use('/', routes);
app.use('/gsm_packets', gsm_packets);
app.use('/lorawan_packets', lorawan_packets);
app.use('/rockblock_packets', rockblock_packets);


//mongodb connection
mongoose.connect('mongodb://'+process.env.MONGODB_ADDON_USER+':'+process.env.MONGODB_ADDON_PASSWORD+'@'+process.env.MONGODB_ADDON_HOST+':'+process.env.MONGODB_ADDON_PORT+'/'+process.env.MONGODB_ADDON_DB);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


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
