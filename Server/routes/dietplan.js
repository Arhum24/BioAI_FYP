var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/dietplan');
var VerifyToken = require('../controllers/VerifyToken');

router.get('/getdietplan', VerifyToken, ctrl.getdietplan);
router.post('/adddietplan', VerifyToken, ctrl.addmedicine);
// router.delete('/deletedietplan', VerifyToken, ctrl.deletedietplan);

module.exports = router;