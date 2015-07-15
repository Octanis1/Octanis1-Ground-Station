var express = require('express');
var router = express.Router();

var Heartbeat = require('../models/heartbeat');



/* GET heartbeats listing. */
router.get('/', function(req, res, next) {

  Heartbeat.find({}, function(err, docs) {
    if (!err){ 
        console.log(docs);
        res.send(docs);
    } else {throw err;}
  });

});


/* POST create heartbeat*/
router.post('/', function(req, res) {
  
  var newHeartbeat = Heartbeat(req.body);
    console.log(newHeartbeat);

  
  newHeartbeat.save(function(err){
    if(err) throw err;
    
    console.log('User created!');
  });
    
  res.send('User saved successfully!');

});



/* GET last heartbeat */
router.get('/last', function(req, res, next) {
  
  //TODO
 
});


module.exports = router;
