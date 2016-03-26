var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');

//model
var LorawanPacket = require('../models/lorawan_packet');



/* POST */
router.post('/'+process.env.GATEWAY_KEY, xmlParser({trim: false, explicitArray: false}), function(req, res) {

  var hex = "08befdfaf5fbffffffff011500802e441dbebebebe20befdfaf5fbffffffff01280530befdfaf5fbffffffff01380540befdfaf5fbffffffff01";
  var hexRev = hex.toString(16).replace(/^(.(..)*)$/, "0$1").match(/../g).reverse().join("");

  console.log(hex);
  console.log(hexRev);

  //var test = RoverStatus.decode(hexRev);

  //console.log("\n --lorawan_packet.js => Decoded message:" + test + "\n");
  var newLorawanPacket = LorawanPacket(req.body); //.deveui_uplink);
  newLorawanPacket.save(function(err){
    if(err) throw err;
  });

  res.send('OK');

});


/* GET */
router.get('/'+process.env.GATEWAY_KEY, function(req, res, next) {

  LorawanPacket.find({}, function(err, docs) {
    if (!err){
        res.jsonp(docs);

        //console.log(docs);

    } else {throw err;}
  });




});



module.exports = router;
