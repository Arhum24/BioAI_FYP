var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/diagnosis');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getdiagnosis', VerifyToken, ctrl.getdiagnosis);
router.get('/getalldiagnosis', VerifyToken, ctrl.getalldiagnosis);
router.post('/adddiagnosis', VerifyToken, ctrl.adddiagnosis);
router.delete('/deletediagnosis', VerifyToken, ctrl.deletedignosis);

module.exports = router;