var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var prescription = require('../models/prescription');
var db = mongoose.connection;
var dburl = 'mongodb://localhost:27017/BioAI';
var VerifyToken = require('./VerifyToken');
// DB connection
db.on('error', function () {
    console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl,{ useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true}, function (err) {
    if (err) {
        return console.log('There was error Connecting to Database URL');
    }

});

// Find all Diagnosis
module.exports.getprescription = (req, res, next) => {
    prescription.find({
        Diagnosis_ID : req.body.Diagnosis_ID
    })
        .populate('prescription')
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

// Add Prescription
module.exports.addprescription = function (req, res) {
    var pres = new prescription();

    pres.Diagnosis_ID = req.body.Diagnosis_ID;
    pres.Medicines = req.body.Medicines;
    pres.Comment = req.body.Comment;
    pres.Date = req.body.Date;


    pres.save(function (error, results) {
        if (error) throw error;
        console.log('Prescription Successfully Added.');
        res.json(results);
        res.send("Added");
    });
};

// // Delete Prescription
// module.exports.deletedignosis = (req, res) => {

//     prescription.findOneAndDelete(
//         { 
//             _id : req.body.id 
//         },
//         (err, result) => {
//         if (err) return res.send(500, err)
//         res.json(result);
//         res.send('Appointment Deleted');
//     });
// };
