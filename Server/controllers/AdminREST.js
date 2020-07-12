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
var Admin = require('../models/Admin');
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

// Add Admin
router.post('', Permissions, (req, res) => {
    var admin = new Admin();

    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.phone_number = req.body.phone_number;
    admin.date = req.body.date;
    admin.image = req.body.image;


    admin.save(function (error, results) {
        if (error) res.json(error);
        console.log('Admin Successfully Added.');
        res.json(results);
    });
});
    // Login Admin
    router.post('/login', Permissions, function (req, res) {
        console.log("Data Send to Amin Login "+req.body.email+" ||| "+req.body.password )
        Admin.findOne(
            {
                email: req.body.email
            },
            function (err, admin) {
                if (err) return res.status(500).send('Error on the server.');
                if (!admin) return res.status(404).send('No Admin found.');
                console.log(req.body.password+" || "+admin.password)
                var passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
                    if (req.body.password !== admin.password) return res.status(401).send("Incorrect Password");

                    res.status(200).send("Sucessful Login");
            });

    });
// View All Doctors
router.get('/DoctorList', Permissions, (req, res) => {
    users.find({
    }).sort({date: -1})
        .exec(function (error, results) {
            if (error) {
                res.json(error);
            }
            // If valid user was not found, send 404
            if (!results) {
                res.status(404).send('No Record Found');
            }
            // Respond with valid data
            else {
                res.json(results);
                console.log('All Doctors returned');
            }
        });
});

// Verify Doctor Info
router.put('/Doctor/Block', Permissions, (req, res) => {
    users.findByIdAndUpdate(
        req.body.id
        ,
        {
            active : req.body.active
        },
        function (err, result) {
            if (err) res.json(err);
            res.json(result);
            console.log('Doctor Active Status Updated.');
        });
});

// Verify Doctor Info
router.put('/Doctor/Verify', Permissions, (req, res) => {
    console.log(req.body.licence_verified)
    users.findByIdAndUpdate(
        req.body.id
        ,
        {
            licence_verified : req.body.licence_verified
        },
        function (err, result) {
            if (err) res.json(err);
            res.json(result);
            console.log('Doctor Verification Updated.'+result);
        });
});


}
catch(err){
    var error = JSON.parse(err);
    console.log(error);
}
module.exports = router;