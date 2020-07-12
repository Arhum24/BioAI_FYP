var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/disease');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getdisease', VerifyToken, ctrl.getdisease);
router.post('/adddisease', VerifyToken, ctrl.adddisease);
// router.delete('/deletedisease', ctrl.deletedisease);

module.exports = router;