var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/patients');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getpatient', VerifyToken, ctrl.getpatient);
router.post('/addpatient', VerifyToken, ctrl.addpatient);
router.delete('/deletepatient', VerifyToken, ctrl.deletepatient);
router.put('/updatepatient', VerifyToken, ctrl.updatepatient);

module.exports = router;