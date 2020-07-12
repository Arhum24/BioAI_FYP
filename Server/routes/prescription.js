var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/prescription');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getprescription', VerifyToken, ctrl.getprescription);
router.post('/addprescription', VerifyToken, ctrl.addprescription);
// router.delete('/deleteprescription', VerifyToken, ctrl.deleteprescription);

module.exports = router;