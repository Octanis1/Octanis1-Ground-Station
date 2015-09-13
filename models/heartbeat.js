var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var heartbeatSchema = new Schema({  
  temp_in: Number, 
  temp_out: Number, 
  pres_in: Number, 
  pres_out: Number, 
  batt_v: Number, 
  batt_i: Number, 
  sol_v: Number, 
  sol_i: Number, 
  mot1_rpm: Number, 
  mot2_rpm: Number, 
  mot3_rpm: Number, 
  mot4_rpm: Number, 
  strut1_pos: Number, 
  strut2_pos: Number, 
  strut3_pos: Number, 
  strut4_pos: Number, 
  iridium_lat: Number, 
  iridium_lon: Number,
  iridium_accuracy: Number, 
  timestamp: Date
});

var Heartbeat = mongoose.model('Heartbeat', heartbeatSchema);  


module.exports = Heartbeat;
