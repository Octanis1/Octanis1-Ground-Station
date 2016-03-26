var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var heartbeatSchema = new Schema({
  user_agent: String,
  payload_hex: String,
  timestamp: Date
});

var Heartbeat = mongoose.model('Heartbeat', heartbeatSchema);
module.exports = Heartbeat;
