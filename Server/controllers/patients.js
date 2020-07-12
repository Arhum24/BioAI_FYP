var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var patients = require('../models/patient');
var db = mongoose.connection;
var dburl = 'mongodb://localhost:27017/BioAI';
var VerifyToken = require('./VerifyToken');
// DB connection
db.on('error', function () {
    console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, function (err) {
    if (err) {
        return console.log('There was error Connecting to Database URL');
    }

});

// Find all Patients
module.exports.getpatient = (req, res, next) => {
    patients.find({
        Doctor_ID: req.body.Doctor_ID
    })
        .populate('patients')
        .exec(function (error, results) {
            if (error) {
                return next(error);
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
};

// Add Patient
module.exports.addpatient = function (req, res, next) {
    var patient = new patients();

    patient.Doctor_ID = req.body.Doctor_ID;
    patient.FirstName = req.body.FirstName;
    patient.LastName = req.body.LastName;
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
    patient.DateReg = req.body.DateReg;


    patient.save(function (error, results) {
        if (error) throw error;
        console.log('Patient Successfully Added.');
        res.json(results);
    });
};



// Delete Patient
module.exports.deletepatient = (req, res) => {



    patients.findOneAndDelete(
        {
            _id: req.body._id
        },
        (err, result) => {
            if (err) return res.send(500, err)
            res.json(result);
            console.log('Patient Deleted');
        });
};

// Update Patient
module.exports.updatepatient = (req, res, next) => {

    patients.findByIdAndUpdate(
        req.body._id
        ,
        {
            // $set: req.body
            Doctor_ID : req.body.Doctor_ID,
            FirstName : req.body.FirstName,
            LastName : req.body.LastName,
            Height : req.body.Height,
            Weight : req.body.Weight,
            Pulse : req.body.Pulse,
            Blood_Pressure : req.body.Blood_Pressure,
            Allergies : req.body.Allergies,
            Operation : req.body.Operation,
            Comorbidity : req.body.Comorbidity,
            Email : req.body.Email,
            CNIC : req.body.CNIC,
            Phone_Number : req.body.Phone_Number,
            Address : req.body.Address,
            DOB : req.body.DOB,
            DateReg : req.body.DateReg
        },
        function (err, result) {
            if (err) return next(err);
            res.json(result);
            console.log('Patient Updated.');
        });

    // patients.findOneandUpdate(
    //     {
    //         // _id: req.body._id
    //         Doctor_ID : req.body.Doctor_ID
    //     },
    //     {
    //         // Doctor_ID : req.body.Doctor_ID,
    //         // FirstName : req.body.FirstName,
    //         // LastName : req.body.LastName,
    //         // Height : req.body.Height,
    //         // Weight : req.body.Weight,
    //         // Pulse : req.body.Pulse,
    //         // Blood_Pressure : req.body.Blood_Pressure,
    //         // Allergies : req.body.Allergies,
    //         // Operation : req.body.Operation,
    //         // Comorbidity : req.body.Comorbidity,
    //         // Email : req.body.Email,
    //         // CNIC : req.body.CNIC,
    //         // Phone_Number : req.body.Phone_Number,
    //         // Address : req.body.Address,
    //         // DOB : req.body.DOB,
    //         // DateReg : req.body.DateReg
    //     },
    //     (err, result) => {
    //         if (err) return res.send(500, err)
    //         res.json(result);
    //         console.log('Patient Updated');
    //     });
};
