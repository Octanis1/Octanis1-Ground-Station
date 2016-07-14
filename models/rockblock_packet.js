var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var RockblockPacketSchema = new Schema({  
  imei: Number,
  momsn: Number,
  transit_time: Date,
  iridium_latitude: Number,
  iridium_longitude: Number,
  iridium_cep: Number,
  data: String
});

var RockblockPacket = mongoose.model('RockblockPacket', RockblockPacketSchema);  

module.exports = RockblockPacket;
