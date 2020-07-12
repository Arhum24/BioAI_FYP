var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var disease = require('../models/disease');
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

// Find Disease
module.exports.getdisease = (req, res, next) => {
    disease.find({
        // Diagnosis_ID : req.body.Diagnosis_ID
    })
        .populate('disease')
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

// Add Disease
module.exports.adddisease = function (req, res) {
    var disease = new disease();

    disease.Name = req.body.Name;
    disease.Description = req.body.Description;


    disease.save(function (error, results) {
        if (error) throw error;
        console.log('Disease Successfully Added.');
        res.json(results);
        res.send("Added");
    });
};

// // Delete Disease
// module.exports.deletedisease = (req, res, next) => {

//     disease.findOneAndDelete(
//         { 
//             _id : req.body.id 
//         },
//         (err, result) => {
//         if (err) return res.send(500, err)
//         res.json(result);
//         res.send('Appointment Deleted');
//     });
// };
