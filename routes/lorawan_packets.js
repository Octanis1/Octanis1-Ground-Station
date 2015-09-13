var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');

//model
var LorawanPacket = require('../models/lorawan_packet');



/* POST */
router.post('/'+process.env.GATEWAY_KEY, xmlParser({trim: false, explicitArray: false}), function(req, res) {

  var newLorawanPacket = LorawanPacket(req.body.deveui_uplink);
  newLorawanPacket.save(function(err){
    if(err) throw err;
  });
  
  res.send('OK');
});


/* GET */
router.get('/'+process.env.GATEWAY_KEY, function(req, res, next) {

  LorawanPacket.find({}, function(err, docs) {
    if (!err){ 
        res.send(docs);        
    } else {throw err;}
  });

});



module.exports = router;
