var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');

var parseString = require('xml2js').parseString;

//model
var RockblockPacket = require('../models/rockblock_packet');



/* POST */
router.post('/'+ process.env.GATEWAY_KEY, xmlParser({trim: false, explicitArray: false}), function(req, res) {

    console.dir("-- body: " + req.body.packet);
    // req.body not parsed here ?! req.body.packet neither (see below)
    parseString(req.body.packet, function (err, result) {
        console.dir(result);
    });

  var newRockblockPacket = RockblockPacket(req.body);
  newRockblockPacket.save(function(err){
    if(err) throw err;
  });

  // response sent as JSON anyway ?!
  res.contentType('application/xml');
  /* req.body is sent back correctly here. Tested with :

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
  */
  res.status(200).send(req.body);
  //res.send('OK');

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
