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
var diagnose = require('../models/diagnose');
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
  

// Find all Specific Diagnosis of the patient by a doctor
router.get('/diagnosis/:Did/:Pid', [VerifyToken, Permissions], (req, res) => {
    diagnose.find({
        Patient_ID: req.params.Pid,
        Doctor_ID: req.params.Did
    })
        .populate('diagnose')
        .exec(function (error, results) {
            if (error) {
                res.json(error);
            }
            // If valid data was not found, send 404
            if (!results) {
                res.status(404).send('No Record Found');
            }
            // Respond with valid data
            else {
                res.json(results);
            }
        });
});

// Find all Diagnosis
router.get('/diagnosis/:Did', [VerifyToken, Permissions], (req, res) => {
    diagnose.find({
        Doctor_ID: req.params.Did
    })
        .populate('diagnose')
        .exec(function (error, results) {
            if (error) {
                res.json(error);
            }
            // If valid data was not found, send 404
            if (!results) {
                res.status(404).send('No Record Found');
            }
            // Respond with valid data
            else {
                res.json(results);
            }
        });
});

// Add Diagnosis
router.post('/diagnosis', [VerifyToken, Permissions], (req, res) => {
    var dia = new diagnose();
    console.log(req.body.Medicine_Notes);
    dia.Patient_ID = req.body.Patient_ID;
    dia.Doctor_ID = req.body.Doctor_ID;
    dia.Tests = req.body.Tests;
    dia.Medicines = req.body.Medicines;
    dia.Medicine_Notes = req.body.Medicine_Notes;
    dia.Symptoms = req.body.Symptoms;
    dia.Findings = req.body.Findings;
    dia.Recommended_Foods = req.body.Recommended_Foods;
    dia.Preventive_Foods = req.body.Preventive_Foods;
    dia.Diet_Note = req.body.Diet_Note;
    dia.DiseaseName = req.body.DiseaseName;
    dia.Comments = req.body.Comments;
    dia.Date = req.body.Date;
    dia.Image = req.body.Image;


    dia.save(function (error, results) {
        if (error) res.status(500).json({error:error,Message:error.message});
        console.log('Diagnosis Successfully Added.');
        res.json(results);
    });
});

// Delete Disgnosis
router.delete('/diagnosis/:id', [VerifyToken, Permissions], (req, res) => {
    diagnose.findOneAndDelete(
        {
            _id: req.params.id
        },
        (err, result) => {
            if (err) return res.send(500, err)
            res.json(result);
            console.log('Diagnose Deleted');
        });
});
// Get specific Disgnosis
router.get('/diagnose/:id', [VerifyToken, Permissions], (req, res) => {
    console.log(req.params.id)
    console.log("Entered the body")
    diagnose.findById(req.params.id, function (error, user) { 

        if(error){res.json({error:"Error",message:error});console.log(error)}
        else{
            res.json(user)
            console.log(user)
        }


     } );
});
// Update Diagnosis
router.put('/diagnosis/:id', [VerifyToken, Permissions], (req, res) => {
    diagnose.findByIdAndUpdate(
        req.params.id
        ,
        {
            Patient_ID : req.body.Patient_ID,
            Doctor_ID : req.body.Doctor_ID,
            Tests : req.body.Tests,
            Medicines : req.body.Medicines,
            Medicine_Notes : req.body.Medicine_Notes,
            Symptoms : req.body.Symptoms,
            Findings : req.body.Findings,
            Recommended_Foods : req.body.Recommended_Foods,
            Preventive_Foods : req.body.Preventive_Foods,
            Diet_Note : req.body.Diet_Note,
            DiseaseName : req.body.DiseaseName,
            Comments : req.body.Comments,
            Date : req.body.Date,
            Image : req.body.Image
        },
        function (err, result) {
            if (err) res.status(500).json({error:err,Message:err.message});
            res.json(result);
            console.log('Diagnose Info Updated.');
        });
});


}
catch(err){
    var error = JSON.parse(err);
    console.log(error);
}
module.exports = router;