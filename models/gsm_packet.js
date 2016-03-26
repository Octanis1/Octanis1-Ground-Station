var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var gsmPacketSchema = new Schema({
  user_agent: String,
  payload_hex: String,
  timestamp: Date
});

var gsmPacket = mongoose.model('gsmPacket', gsmPacketSchema);
module.exports = gsmPacket;
