var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var medicine = require('../models/medicine');
var db = mongoose.connection;
var dburl = 'mongodb://localhost:27017/BioAI';
var VerifyToken = require('./VerifyToken');
// DB connection
db.on('error', function () {
    console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true },function (err) {
    if (err) {
        return console.log('There was error Connecting to Database URL');
    }

});

// Find all Medicine
module.exports.getmedicine = (req, res, next) => {
    medicine.find({
        Diagnosis_ID : req.body.Diagnosis_ID
    })
        .populate('medicine')
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

// Add Medicine
module.exports.addmedicine = function (req, res) {
    var med = new medicine();

    med.Name = req.body.Name;
    med.Description = req.body.Description;
    med.Dosage = req.body.Dosage;


    med.save(function (error, results) {
        if (error) throw error;
        console.log('Medicine Successfully Added.');
        res.json(results);
        res.send("Added");
    });
};

// // Delete Medicine
// module.exports.deletemedicine = (req, res, next) => {

//     medicine.findOneAndDelete(
//         { 
//             _id : req.body.id 
//         },
//         (err, result) => {
//         if (err) return res.send(500, err)
//         res.json(result);
//         res.send('Appointment Deleted');
//     });
// };
