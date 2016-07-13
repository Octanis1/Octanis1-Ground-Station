var express = require('express');
var router = express.Router();
var fs = require('fs');
var inspect = require('util').inspect;

var xml2js = require('xml2js');
var parser = new xml2js.Parser();


//model
var RockblockPacket = require('../models/rockblock_packet');


/* POST */

router.post('/'+ process.env.GATEWAY_KEY, function(req, res) {
res.contentType('text/plain');
   
   
   

  /*
   req.body is sent back correctly here. Tested with :

    <?xml version="1.0" encoding="UTF-8" ?>
    <packet>
        <imei>321</imei>
        <momsn>432</momsn>
        <transit_time>12-10-10 10:41:50</transit_time>
        <iridium_latitude>9</iridium_latitude>
        <iridium_longitude>9</iridium_longitude>
        <iridium_cep>9</iridium_cep>
        <data>08befdfaf5fbffffffff011500802e441dbebebebe20befdfaf5fbffffffff01280530befdfaf5fbffffffff01380540befdfaf5fbffffffff01</data>
    </packet>
  
  res.status(200).send(req.body);*/
  
  parser.parseString(req.body.toString(), function(err,result){
    //Extract the value from the data element
    imei = result['packet']['imei'];
    momsn = result['packet']['momsn'];
    transmit_time = result['packet']['transmit_time'];
    iridium_latitude = result['packet']['iridium_latitude'];
    iridium_longitude = result['packet']['iridium_longitude'];
    iridium_cep = result['packet']['iridium_cep'];
    data = result['packet']['data'];
    
  });
  
  var newRockblockPacket_frame = {  
    imei: imei,
    momsn: momsn,
    transmit_time: transmit_time,
    iridium_latitude: iridium_latitude,
    iridium_longitude: iridium_longitude,
    iridium_cep: iridium_cep,
    data: data
  }

  var newRockblockPacket = RockblockPacket(newRockblockPacket_frame);

  console.log("imei :".concat(imei.toString(),"\nmomsn :",momsn.toString(),"\niridium_latitude :", iridium_latitude.toString(), "\niridium_cep :", iridium_cep.toString(),"\ndata :",data.toString()))

  // le remplissage de la base ne fonctionne pas car il y a un probleme avec transmit_time qui est "undefined"

  /*newRockblockPacket.save(function(err){
    if(err) throw err;
  });*/ 
  
  res.status(200).send('OK');
});

/* GET */
router.get('/'+ process.env.GATEWAY_KEY, function(req, res, next) {

  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        res.send(docs);
    } else {throw err;}
  });

});



module.exports = router;
