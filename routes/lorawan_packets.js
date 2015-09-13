var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');

//model
var LorawanPacket = require('../models/lorawan_packet');



/* POST */
router.post('/', xmlParser({trim: false, explicitArray: false}), function(req, res) {

  if(req.query.gateway_key != process.env.GATEWAY_KEY){
    res.send('OK');
    return false;
  }

  var newLorawanPacket = LorawanPacket(req.body.deveui_uplink);
  newLorawanPacket.save(function(err){
    if(err) throw err;
  });
  
  res.send('OK');
});


/* GET */
router.get('/', function(req, res, next) {
  
  if(req.query.gateway_key != process.env.GATEWAY_KEY){
    res.send('OK');
    return false;
  }

  LorawanPacket.find({}, function(err, docs) {
    if (!err){ 
        res.send(docs);        
    } else {throw err;}
  });

});



module.exports = router;
