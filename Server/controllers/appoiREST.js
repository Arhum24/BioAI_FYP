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
var appointment = require('../models/appointment');
var db = mongoose.connection;
// var dburl = 'mongodb://localhost:27017/BioAI';
var dburl = 'mongodb+srv://BioAIDB:WrongPassword@bioaidb.ecnap.gcp.mongodb.net/BioAIDB?retryWrites=true&w=majority';
var moment = require('moment')

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
  

// Find all Appointments
router.get('/allappointment/:id', [VerifyToken, Permissions], (req, res) => {
    appointment.find({
        Doctor_ID: req.params.id
    }).sort({DateAppoi: 'descending'})
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
            }
        });
});

// Find Appointment by Date
router.get('/appointment/:Did/:Date', [VerifyToken, Permissions], (req, res) => {
    
    console.log(req.params.Date.substring(0,11));
    var timeStart = req.params.Date.substring(0,11)+"00:00:00.000+00:00";
    console.log(timeStart.trim());
    var timeEnd = req.params.Date.substring(0,11)+"23:59:59.999+00:00";
    console.log(timeEnd.trim());
    appointment.find({
        Doctor_ID: req.params.Did,
        // DateAppoi: req.params.Date
        // DateAppoi : 
        // {
        //     "$gte": req.params.Date
        // }
        DateAppoi: {
                $gte: timeStart,
                $lte: timeEnd
            }
        
    })
        .exec(function (error, results) {
            if (error) {
                res.json(error);
            }
            if (!results) {
                res.status(404), send('No Record Found');
            }
            else {
                console.log(results);
                res.json(results);
            }
        });
});

// Add Appointment
router.post('/appointment', [VerifyToken, Permissions], (req, res) => {

    console.log(req.body.Name,req.body.Email,req.body.Phone_Number,req.body.DateAppoi,req.body.Doctor_ID)
    var appoi = new appointment();

    appoi.Doctor_ID = req.body.Doctor_ID;
    appoi.Name = req.body.Name;
    appoi.Email = req.body.Email;
    appoi.Phone_Number = req.body.Phone_Number;
    appoi.DateAppoi = req.body.DateAppoi;
    // appoi.Time = req.body.Time;


    appoi.save(function (error, results) {
        if (error) res.status(500).json({error:error,Message:error.message});
        console.log('Appointment Successfully Added.');
        res.json(results);
    });
});

// Delete Appointment
router.delete('/appointment/:id', [VerifyToken, Permissions], (req, res) => {
    appointment.findOneAndDelete(
        {
            _id: req.params.id
        },
        (err, result) => {
            if (err) return res.status(500).json({error:err,Message:err.message})
            res.json(result);
            console.log('Appointment Deleted');
        });
});

// Update Appointment
router.put('/appointment/:id', [VerifyToken, Permissions], (req, res) => {
    appointment.findByIdAndUpdate(
        req.params.id
        ,
        {
            // $set: req.body
            Doctor_ID : req.body.Doctor_ID,
            Name : req.body.Name,
            Email : req.body.Email,
            Phone_Number : req.body.Phone_Number,
            DateAppoi : req.body.DateAppoi
        },
        function (err, result) {
            if (err) res.status(500).json({error:err,Message:err.message});
            res.json(result);
            console.log('Appointment Updated.');
            
        });
});

module.exports = router;
}
catch(err){
    var error = JSON.parse(err);
    console.log(error);
}