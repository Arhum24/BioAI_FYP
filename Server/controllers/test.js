var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/test', (req, res) => {
return 	res.send("This Route is working")
        console.log("This Route is Working")
});
module.exports = router;