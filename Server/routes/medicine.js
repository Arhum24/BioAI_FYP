var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/medicine');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getmedicine', VerifyToken, ctrl.getmedicine);
router.post('/addmedicine', VerifyToken, ctrl.addmedicine);
// router.delete('/deletemedicine', VerifyToken, ctrl.deletemedicine);

module.exports = router;