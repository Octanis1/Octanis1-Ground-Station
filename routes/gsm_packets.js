var express = require('express');
var router = express.Router();

var gsmPacket = require('../models/gsm_packet');



/* GET gsmPacket listing. */
router.get('/', function(req, res, next) {

  gsmPacket.find({}, function(err, docs) {
    if (!err){
        console.log(docs);
        res.send(docs);
    } else {throw err;}
  });

});


/* POST create heartbeat*/
router.post('/'+process.env.GATEWAY_KEY, function(req, res) {
  var ua = req.headers['user-agent'];
  var payload = req.body;

  console.log(new Date());
  console.log('User-Agent: ' + ua);
  console.log(req.body);
  console.log(req.headers);
  /*
  var newgsmPacket = Heartbeat(req.body);

  newgsmPacket.save(function(err){
    if(err) throw err;
  });
  */
  res.send('OK');

});



/* GET last gsmPacket */
router.get('/last', function(req, res, next) {

  //TODO

});


module.exports = router;
