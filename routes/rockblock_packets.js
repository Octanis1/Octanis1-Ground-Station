var express = require('express');
var router = express.Router();
var xmlParser = require('express-xml-bodyparser');
var fs = require('fs');
var inspect = require('util').inspect;

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var mavlink = require('mavlink');

var myMAV = new mavlink(1,1);


//model
var RockblockPacket = require('../models/rockblock_packet');

var decodedData;
var newRockblockPacket_frame;
/* POST */
myMAV.on("ready", function() {
  //parse incoming serial data
  console.log("ready");
});
myMAV.on("message", function(message) {
   //console.log(message);
});

myMAV.on("RAW_PRESSURE", function(message, fields) {
    console.log(fields);
    newRockblockPacket_frame = {  
      decodeData: message,
      decodePayload: fields
    };
    
    var newRockblockPacket = RockblockPacket(newRockblockPacket_frame);

    newRockblockPacket.save(function(err){
      if(err) throw err;
    });
});

myMAV.on("SYS_STATUS", function(message, fields) {
    console.log(fields);
    newRockblockPacket_frame = {  
      decodeData: message,
      decodePayload: fields
    };
    
    var newRockblockPacket = RockblockPacket(newRockblockPacket_frame);

    newRockblockPacket.save(function(err){
      if(err) throw err;
    });
});

myMAV.on("GPS_RAW_INT", function(message, fields) {
    console.log(fields);
    newRockblockPacket_frame = {  
      decodeData: message,
      decodePayload: fields
    };
    
    var newRockblockPacket = RockblockPacket(newRockblockPacket_frame);

    newRockblockPacket.save(function(err){
      if(err) throw err;
    });
});

myMAV.on("NAMED_VALUE_FLOAT", function(message, fields) {
    console.log(fields);
    newRockblockPacket_frame = {  
      decodeData: message,
      decodePayload: fields
    };
    
    var newRockblockPacket = RockblockPacket(newRockblockPacket_frame);

    newRockblockPacket.save(function(err){
      if(err) throw err;
    });
});

function gps_raw_int_generator(longitude,latitude,altitude)
{
    myMAV.createMessage('GPS_RAW_INT', 
  {
    'fix_type' : 4,
    'lat' : latitude,
    'lon' : longitude,
    'alt': altitude,
    'time_usec': 0,
    'eph': 0,
    'epv': 0,
    'vel': 0,
    'hdg': 0,
    'cog': 0,
    'satellites_visible': []
  },
  function(msg) {
   console.log(msg.buffer);
 });
}

function sys_status_generator(volt,amp,bat)
{
    myMAV.createMessage('SYS_STATUS', 
  {
    'mode' : 0,
    'load': 1,
    'voltage_battery' : volt,
    'current_battery' : amp,
    'battery_remaining': bat,
    'onboard_control_sensors_present': 1,
    'onboard_control_sensors_enabled': 1,
    'onboard_control_sensors_health': 1,
    'drop_rate_comm': 0,
    'errors_comm': 0,
    'errors_count1': 0,
    'errors_count2': 0,
    'errors_count3': 0,
    'errors_count4': 0
  },
  function(msg) {
   console.log(msg.buffer);
 });
}

function raw_pressure_generator(press_abs,temperature)
{
    myMAV.createMessage('RAW_PRESSURE', 
  {
    'time_usec' : 0,
    'press_abs': press_abs,
    'press_diff1' : 0,
    'press_diff2' : 0,
    'temperature': temperature
  },
  function(msg) {
   console.log(msg.buffer);
 });
}

function named_value_float_generator(name,value)
{
    myMAV.createMessage('NAMED_VALUE_FLOAT', 
  {
    'time_boot_ms' : 0,
    'name': name,
    'value' : value
  },
  function(msg) {
   console.log(msg.buffer);
 });
}

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
    //listen for messages
  
  newRockblockPacket_frame = {  
    imei: parseFloat(req.body.packet.imei),
    momsn: parseFloat(req.body.packet.momsn),
    transit_time: dt, //transit_time,
    iridium_latitude: parseFloat(req.body.packet.iridium_latitude),
    iridium_longitude: parseFloat(req.body.packet.iridium_longitude),
    iridium_cep: parseFloat(req.body.packet.iridium_cep),
    data: req.body.packet.data
  }
  
  myMAV.parse(new Buffer(req.body.packet.data,'hex'));
  
  res.status(200).send('OK');
});


/* GET */

router.get('/hex/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var final="";
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        docs.forEach(function(item,index){
          final=final.concat(String(item.data),"\n");
        });
        final=final.concat("")
        res.send(final);
    } else {throw err;}
  });

});

router.get('/gps_data/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var final="";
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        docs.forEach(function(item,index){
          if(item.decodeData != undefined){
            if(item.decodeData.id == 24){
              final=final.concat("{\"lon\": ",String(item.decodePayload.lon),", \"lat\": ",String(item.decodePayload.lat),", \"alt\": ",String(item.decodePayload.alt),"}\n");
            }  
          }
        });
        res.send(final);
    } else {throw err;}
  });
});

router.get('/sys_status_data/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var final="";
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        docs.forEach(function(item,index){
          if(item.decodeData != undefined){
            if(item.decodeData.id == 1){
              final=final.concat("{\"voltage_battery\": ",String(item.decodePayload.voltage_battery),", \"current_battery\": ",String(item.decodePayload.current_battery),", \"battery_remaining\": ",String(item.decodePayload.battery_remaining),"}\n");
            }  
          }
        });
        res.send(final);
    } else {throw err;}
  });
});

router.get('/raw_pressure_data/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var final="";
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        docs.forEach(function(item,index){
          if(item.decodeData != undefined){
            if(item.decodeData.id == 28){
              final=final.concat("{\"press_abs\": ",String(item.decodePayload.press_abs),", \"temperature\": ",String(item.decodePayload.temperature),"}\n");
            }  
          }
        });
        res.send(final);
    } else {throw err;}
  });
});

router.get('/uv_data/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var final="";
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        docs.forEach(function(item,index){
          if(item.decodeData != undefined){
            if(item.decodeData.id == 251){
              if(item.decodePayload.name[0] == "U")
                final=final.concat("{\"uv\": ",String(item.decodePayload.value),"}\n");
            }  
          }
        });
        res.send(final);
    } else {throw err;}
  });
});

router.get('/geiger_data/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var final="";
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        docs.forEach(function(item,index){
          if(item.decodeData != undefined){
            if(item.decodeData.id == 251){
              if(item.decodePayload.name[0] == "G")
              final=final.concat("{\"geiger_counter\": ",String(item.decodePayload.value),"}\n");
            }  
          }
        });
        res.send(final);
    } else {throw err;}
  });
});

router.get('/generator/gps_raw_int/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var a = gps_raw_int_generator(10,10,100);
  res.send(a);
});

router.get('/generator/sys_status/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var a = sys_status_generator(9000,200,100);
  res.send(a);
});

router.get('/generator/raw_pressure/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var a = raw_pressure_generator(100,-20);
  res.send(a);
});

router.get('/generator/uv/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var a = named_value_float_generator("U",50.0);
  res.send(a);
});

router.get('/generator/geiger/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  var a = named_value_float_generator("G",10.0);
  res.send(a);
});

router.get('/'+ process.env.GATEWAY_KEY, function(req, res, next) {
  RockblockPacket.find({}, function(err, docs) {
    if (!err){
        res.send(docs);
    } else {throw err;}
  });

});

module.exports = router;