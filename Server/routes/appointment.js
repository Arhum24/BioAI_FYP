var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/appointments');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getappointment', VerifyToken, ctrl.getappointment);
router.get('/getappointmentbyDate', VerifyToken, ctrl.getappointmentbyDate);
router.post('/addappointment', VerifyToken, ctrl.addappointment);
router.delete('/deleteappointment', VerifyToken, ctrl.deleteappointment);

module.exports = router;