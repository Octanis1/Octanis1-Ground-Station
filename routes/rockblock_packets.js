var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');
var fs = require('fs');
var inspect = require('util').inspect;

var xml2js = require('xml2js');
var parser = new xml2js.Parser();


//model
var RockblockPacket = require('../models/rockblock_packet');


/* POST */

router.post('/'+ process.env.GATEWAY_KEY, xmlParser({trim: false, explicitArray: false}), function(req, res) {
  //console.log(req.body.packet);
  var transit_time = req.body.packet.transit_time;
  var year='20'.concat(transit_time[0],transit_time[1]);
  var month=transit_time[3].concat(transit_time[4]);
  var day=transit_time[6].concat(transit_time[7]);
  var hour=transit_time[8].concat(transit_time[9]);
  var minute=transit_time[11].concat(transit_time[12]);
  var second=transit_time[14].concat(transit_time[15]);
  var dt = new Date(year,month-1,day,hour,minute,second);
  
  var newRockblockPacket_frame = {  
    imei: parseFloat(req.body.packet.imei),
    momsn: parseFloat(req.body.packet.momsn),
    transit_time: dt, //transit_time,
    iridium_latitude: parseFloat(req.body.packet.iridium_latitude),
    iridium_longitude: parseFloat(req.body.packet.iridium_longitude),
    iridium_cep: parseFloat(req.body.packet.iridium_cep),
    data: req.body.packet.data
  }

  var newRockblockPacket = RockblockPacket(newRockblockPacket_frame);

  newRockblockPacket.save(function(err){
    if(err) throw err;
  });
  
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
    </packet>*/
  /* // below what you need if you recieve a text/plain.
  parser.parseString(req.body.toString(), function(err,result){
    //Extract the value from the data element
    imei = result['packet']['imei'];
    momsn = result['packet']['momsn'];
    transit_time = result['packet']['transit_time'];
    
    var year='20'.concat(transit_time[0][0],transit_time[0][1]);
    var month=transit_time[0][3].concat(transit_time[0][4]);
    var day=transit_time[0][6].concat(transit_time[0][7]);
    var hour=transit_time[0][8].concat(transit_time[0][9]);
    var minute=transit_time[0][11].concat(transit_time[0][12]);
    var second=transit_time[0][14].concat(transit_time[0][15]);
    dt = new Date(year,month,day,hour,minute,second);

    iridium_latitude = result['packet']['iridium_latitude'];
    iridium_longitude = result['packet']['iridium_longitude'];
    iridium_cep = result['packet']['iridium_cep'];
    data = result['packet']['data'];
    
  });
  
  var newRockblockPacket_frame = {  
    imei: parseFloat(imei),
    momsn: parseFloat(momsn),
    transit_time: dt, //transit_time,
    iridium_latitude: parseFloat(iridium_latitude),
    iridium_longitude: parseFloat(iridium_longitude),
    iridium_cep: parseFloat(iridium_cep),
    data: data
  }

  var newRockblockPacket = RockblockPacket(newRockblockPacket_frame);

//  console.log("imei :".concat(imei.toString(),"\nmomsn :",momsn.toString(),"\niridium_latitude :", iridium_latitude.toString(), "\niridium_cep :", iridium_cep.toString(),"\ndata :",data.toString()))

  newRockblockPacket.save(function(err){
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