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
  
  res.status(200).send('OK');
});

/* GET */
router.get('/data/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var final="";
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        docs.forEach(function(item,index){
          final=final.concat(String(item.data),"<br/>");
        });
        res.send(final);
    } else {throw err;}
  });

});

router.get('/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        res.send(docs);
    } else {throw err;}
  });

});

module.exports = router;