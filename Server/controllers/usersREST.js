var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');
var mongoose = require('mongoose');
var users = require('../models/users');
var db = mongoose.connection;
// var dburl = 'mongodb://localhost:27017/BioAI';
var dburl = 'mongodb+srv://BioAIDB:WrongPassword@bioaidb.ecnap.gcp.mongodb.net/BioAIDB?retryWrites=true&w=majority';

try{
// DB connection
db.on('error', function () {
    console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function (err) {
    if (err) {
        return console.log('There was error Connecting to Database URL');
    }

});

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

// Get User Data
router.get('/user', [VerifyToken, Permissions], (req, res) => {
    users.findOne({
        email: req.body.email
    })
        .exec(function (error, results) {
            var passwordIsValid = bcrypt.compareSync(req.body.password, results.password);
            if (error) {
                res.json(error);
            }
            // If valid user was not found, send 404
            if (!results) {
                res.status(404).send('No Record Found');
            }
            if (results.email != req.body.email) {
                res.send('Incorrect Email');
            }
            if (!passwordIsValid) {
                res.send('Incorrect Password');
            }
            else {
                // Respond with valid data
                res.json(results);
            }
        });
});

// Send User Data
router.post('/user', [VerifyToken, Permissions], (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var user = new users();

    user.active = req.body.active;
    user.name = req.body.name;
    user.cnic = req.body.cnic;
    user.licence = req.body.licence;
    user.licence_country = req.body.licence_country,
    user.licence_verified = req.body.licence_verified;
    user.licence_image = req.body.licence_image;
    user.email = req.body.email;
    user.email_verified = req.body.email_verified;
    user.password = hashedPassword;
    user.hospital = req.body.hospital;
    user.qualification = req.body.qualification;
    user.phone_number = req.body.phone_number;
    user.phone_number_verified = req.body.phone_number_verified;
    user.date = req.body.date;
    user.image = req.body.image;


    user.save(function (error, results) {
        if (error) res.json(error);
        console.log('User Successfully Saved.');
        res.json(results);
    });
});

// Delete User
router.delete('/user/:id', [VerifyToken, Permissions], (req, res) => {
    users.findOneAndDelete(
        {
            _id: req.params.id
        },
        (err, result) => {
            if (err) return res.send(err)
            res.json(result);
            console.log('User Deleted');
        });
});

// Update User
router.put('/user/:id', [VerifyToken, Permissions], (req, res) => {
    // var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    users.findByIdAndUpdate(
            req.params.id
        ,
        {
            $set: req.body,
            // active: req.body.active,
            // name: req.body.name,
            // cnic: req.body.cnic,
            // licence: req.body.licence,
            // licence_country: req.body.licence_country,
            // licence_verified: req.body.licence_verified,
            // licence_image: req.body.licence_image,
            // email: req.body.email,
            // email_verified: req.body.email_verified,
            // password: hashedPassword,
            // hospital: req.body.hospital,
            // qualification: req.body.qualification,
            // phone_number: req.body.phone_number,
            // phone_number_verified: req.body.phone_number_verified,
            // date: req.body.date,
            // image: req.body.image,
        },
        function (err, result) {
            if (err) res.json(err);
            res.json(result);
            console.log('User Info Updated.');
        });
});


}
catch(err){
    var error = JSON.parse(err);
    console.log(error);
}
module.exports = router;