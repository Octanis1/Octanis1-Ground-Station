var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var LorawanPacketSchema = new Schema({  
  time: Date,
  deveui: String,
  fport: Number,
  fcntup: Number,
  fcntdn: Number,
  payload_hex: String,
  mic_hex: String,
  lrcid: String,
  lrrrssi: Number,
  lrrsnr: Number,
  spfact: Number,
  subband: String,
  channel: String,
  devlrrcnt: Number,
  lrrid: Number,
  lrrlat: Number,
  lrrlon: Number,
  customerid: Number,
  modelcfg: Number
});

var LorawanPacket = mongoose.model('LorawanPacket', LorawanPacketSchema);  

module.exports = LorawanPacket;
