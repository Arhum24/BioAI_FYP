var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var diagnose = require('../models/diagnose');
var db = mongoose.connection;
var dburl = 'mongodb://localhost:27017/BioAI';
var VerifyToken = require('./VerifyToken');
// DB connection
db.on('error', function () {
    console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true }, function (err) {
    if (err) {
        return console.log('There was error Connecting to Database URL');
    }

});

// Find A Diagnosis
module.exports.getdiagnosis = (req, res, next) => {
    diagnose.find({
        Patient_ID : req.body.Patient_ID,
        Doctor_ID : req.body.Doctor_ID
    })
        .populate('diagnose')
        .exec(function (error, results) {
            if (error) {
                return next(error);
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
};

// Find all Diagnosis
module.exports.getalldiagnosis = (req, res, next) => {
    diagnose.find({
        Doctor_ID : req.body.Doctor_ID
    })
        .populate('diagnose')
        .exec(function (error, results) {
            if (error) {
                return next(error);
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
};

// Add Diagnosis
module.exports.adddiagnosis = function (req, res) {
    var dia = new diagnose();

    dia.Patient_ID = req.body.Patient_ID;
    dia.Doctor_ID = req.body.Doctor_ID;
    dia.Medicines = req.body.Medicines;
    dia.Symptoms = req.body.Symptoms;
    dia.Findings = req.body.Findings;
    dia.Note = req.body.Note;
    dia.DiseaseName = req.body.DiseaseName;
    dia.Date = req.body.Date;
    dia.Image = req.body.Image;


    dia.save(function (error, results) {
        if (error) throw error;
        console.log('Diagnosis Successfully Added.');
        res.json(results);
    });
};

// Delete Diagnosis
module.exports.deletedignosis = (req, res) => {

    diagnose.findOneAndDelete(
        { 
            _id : req.body.id 
        },
        (err, result) => {
        if (err) return res.send(500, err)
        res.json(result);
        console.log('Appointment Deleted');
    });
};
