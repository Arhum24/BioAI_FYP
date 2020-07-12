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
var patients = require('../models/patient');
var db = mongoose.connection;
// var dburl = 'mongodb://localhost:27017/BioAI';
var dburl = 'mongodb+srv://BioAIDB:WrongPassword@bioaidb.ecnap.gcp.mongodb.net/BioAIDB?retryWrites=true&w=majority';

try{
// DB connection
db.on('error', function () {
    console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },function (err) {
    if (err) {
        return console.log('There was error Connecting to Database URL');
    }

});

// Permissions
var Permissions = function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', '*')
  
    res.setHeader('Access-Control-Allow-Origin', '*')
  
    //res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type,Authentication,Accept')
    res.setHeader('Access-Control-Allow-Headers', '*')
    
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  }
  

// Get all Patients
router.get('/patient/:Did', [VerifyToken, Permissions], (req, res) => {
    patients.find({
        Doctor_ID: req.params.Did
    })
        .populate('patients')
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

// Get a Patient
router.get('/patients/:Pid', [VerifyToken, Permissions], (req, res) => {
    patients.find({
        _id: req.params.Pid
    })
        .populate('patients')
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
                console.log(results)
                res.json(results);
            }
        });
});

// Add Patients
router.post('/patient', [VerifyToken, Permissions], (req, res) => {
    var patient = new patients();

    patient.Doctor_ID = req.body.Doctor_ID;
    patient.Name = req.body.Name;
    patient.Gender = req.body.Gender;
    patient.Maritial_Status = req.body.Maritial_Status;
    patient.Blood_Group = req.body.Blood_Group;
    patient.Height = req.body.Height;
    patient.Weight = req.body.Weight;
    patient.Pulse = req.body.Pulse;
    patient.Blood_Pressure = req.body.Blood_Pressure;
    patient.Allergies = req.body.Allergies;
    patient.Operation = req.body.Operation;
    patient.Comorbidity = req.body.Comorbidity;
    patient.Email = req.body.Email;
    patient.CNIC = req.body.CNIC;
    patient.Phone_Number = req.body.Phone_Number;
    patient.Address = req.body.Address;
    patient.DOB = req.body.DOB;
    // patient.DateReg = req.body.DateReg;


    patient.save(function (error, results) {
        if (error) res.json(error);
        console.log('Patient Successfully Added.');
        res.json(results);
    });
});

// Delete Patient
router.delete('/patient/:id', [VerifyToken, Permissions], (req, res) => {
    patients.findOneAndDelete(
        {
            _id: req.params.id
        },
        (err, result) => {
            if (err) return res.send(500, err)
            res.json(result);
            console.log('Patient Deleted');
        });
});

// Update Patient
router.put('/patient/:id', [VerifyToken, Permissions], (req, res) => {
    patients.findByIdAndUpdate(
        req.params.id
        ,
        {
            // $set: req.body
            Doctor_ID : req.body.Doctor_ID,
            Name : req.body.Name,
            Height : req.body.Height,
            Weight : req.body.Weight,
            Gender : req.body.Gender,
            Blood_Group : req.body.Blood_Group,
            Maritial_Status : req.body.Maritial_Status,
            Pulse : req.body.Pulse,
            Blood_Pressure : req.body.Blood_Pressure,
            Allergies : req.body.Allergies,
            Operation : req.body.Operation,
            Comorbidity : req.body.Comorbidity,
            Email : req.body.Email,
            CNIC : req.body.CNIC,
            // CNIC : 0,
            Phone_Number : req.body.Phone_Number,
            Address : req.body.Address,
            DOB : req.body.DOB,
            // DateReg : req.body.DateReg
        },
        function (err, result) {
            if (err) res.json(err);
            res.json(result);
            console.log('Patient Updated.');
        });
});

module.exports = router;
}
catch(err){
    var error = JSON.parse(err);
    console.log(error);
}
