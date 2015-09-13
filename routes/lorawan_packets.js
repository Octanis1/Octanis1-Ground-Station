var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');

//model
var LorawanPacket = require('../models/lorawan_packet');



/* POST */
router.post('/', xmlParser({trim: false, explicitArray: false}), function(req, res) {

  var newLorawanPacket = LorawanPacket(req.body.deveui_uplink);
  newLorawanPacket.save(function(err){
    if(err) throw err;
  });
  
  res.send('OK');
});


router.get('/', function(req, res, next) {

  LorawanPacket.find({}, function(err, docs) {
    if (!err){ 
        console.log(docs);
        res.send(docs);
    } else {throw err;}
  });

});



module.exports = router;
