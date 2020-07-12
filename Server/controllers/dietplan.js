var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var dietplan = require('../models/dietplan');
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

// Find Diet Plan
module.exports.getdietplan = (req, res, next) => {
    dietplan.find({
        Diagnosis_ID : req.body.Diagnosis_ID
    })
        .populate('dietplan')
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

// Add Diet Plan
module.exports.addmedicine = function (req, res) {
    var dp = new dietplan();

    dp.Diagnosis_ID = req.body.Diagnosis_ID;
    dp.Food = req.body.Food;
    dp.Instruction = req.body.Instruction;


    dp.save(function (error, results) {
        if (error) throw error;
        console.log('Diet Plan Successfully Added.');
        res.json(results);
        res.send("Added");
    });
};

// // Delete Diet Plan
// module.exports.deletedietplan = (req, res) => {

//     dietplan.findOneAndDelete(
//         { 
//             id : req.body.id 
//         },
//         (err, result) => {
//         if (err) return res.send(500, err)
//         res.json(result);
//         res.send('Appointment Deleted');
//     });
// };
