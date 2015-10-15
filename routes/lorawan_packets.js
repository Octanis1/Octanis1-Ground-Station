var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');


//protobuf
var ProtoBuf = require("protobufjs");
var RoverStatusBuilder = ProtoBuf.loadProtoFile("protobuf/rover_status.proto");
var RoverStatus = RoverStatusBuilder.build("rover_status");

//model
var LorawanPacket = require('../models/lorawan_packet');



/* POST */
router.post('/'+process.env.GATEWAY_KEY, xmlParser({trim: false, explicitArray: false}), function(req, res) {

  var newLorawanPacket = LorawanPacket(req.body.deveui_uplink);
  newLorawanPacket.save(function(err){
    if(err) throw err;
  });
  
  res.send('OK');


  var RoverStatusDecoded = RoverStatus.decode(req.body.deveui_uplink.payload_hex);
  console.log(RoverStatusDecoded);
});


/* GET */
router.get('/'+process.env.GATEWAY_KEY, function(req, res, next) {

  LorawanPacket.find({}, function(err, docs) {
    if (!err){ 
        //res.send(docs);    

        var data = []; // List of Buffer objects
        var raw = "08befdfaf5fbffffffff011500802e441dbebebebe20befdfaf5fbffffffff01280530befdfaf5fbffffffff01380540befdfaf5fbffffffff01";
        data.push(raw);

        data = Buffer.concat(data);

        var RoverStatusDecoded = RoverStatus.decode(data);
        res.send(RoverStatusDecoded);     
    
    } else {throw err;}
  });




});



module.exports = router;
