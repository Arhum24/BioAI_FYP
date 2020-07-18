var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');

try{
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


// Registration
router.post('/register', Permissions, function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    active : req.body.active,
    name : req.body.name,
    cnic : req.body.cnic,
    licence : req.body.licence,
    licence_verified : req.body.licence_verified,
    licence_country : req.body.licence_country,
    licence_image : req.body.licence_image,
    email : req.body.email,
    email_verified : req.body.email_verified,
    password : hashedPassword,
    hospital : req.body.hospital,
    qualification : req.body.qualification,
    phone_number : req.body.phone_number,
    phone_number_verified : req.body.phone_number_verified,
    date : req.body.date,
    image : req.body.image,
  },
    function (err, user) {
      if (err) return res.status(500).send({error:err,Message:err.message})
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
});

router.get('/userdata', [VerifyToken, Permissions], function (req, res) {

  User.findById(req.userId, function (err, user) {
    if (err) return res.status(500).send("There was a Problem Finding the User.");
    if (!user) return res.status(404).send("No User found.");

    res.status(200).send(user);
  });

});


// Login
router.post('/login', Permissions, function (req, res) {

  User.findOne(
    {
      email: req.body.email
    },
    function (err, user) {
      if (err) return res.status(500).send({error:"Server Error"});
      if (!user) return res.status(404).send({Message:"No User Found"});
      if(user.active == true){
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null,Message:"Wrong Password" });

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
      }
      else{
        res.send({blocked:true,Message: "User blocked for providing wrong information"})
      }
    });

});


// Logout
router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});


}
catch(err){
  var error = JSON.parse(err);
  console.log(error);
}
module.exports = router;