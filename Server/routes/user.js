var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/users');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getuser', VerifyToken, ctrl.getuser);
router.post('/adduser', VerifyToken, ctrl.adduser);
router.delete('/deleteuser', VerifyToken, ctrl.deleteuser);

module.exports = router;