var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/dashboard');
var VerifyToken = require('../controllers/VerifyToken');

// Permissions
var Permissions = function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', '*');
  
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    //res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type,Authentication,Accept')
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  }
  

router.get('/graphDate/:Did', [VerifyToken, Permissions], ctrl.graphDate);
router.get('/graphDisease', [VerifyToken, Permissions], ctrl.graphDisease);
router.get('/allAppointments/:Did', [VerifyToken, Permissions], ctrl.allAppointments);
router.get('/WeekAppointment/:Did', [VerifyToken, Permissions], ctrl.WeekAppointment);
router.get('/firstPatients/:Did', [VerifyToken, Permissions], ctrl.firstPatients);
router.get('/allPatients/:Did', [VerifyToken, Permissions], ctrl.allPatients);
router.get('/Dashboard/:Did', [VerifyToken, Permissions], ctrl.Dashboard);


module.exports = router;