var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var appointment = require('../models/appointment');
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

// Find all Appointments
module.exports.getappointment = (req, res, next) => {
    appointment.find({
        Doctor_ID : req.body.Doctor_ID
    })
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

// Find an Appointment with Date
module.exports.getappointmentbyDate = (req,res,next) => {
    appointment.find({
        DateAppoi : req.body.DateAppoi
    })
        .exec(function(error, results){
            if(error){
                return next(error);
            }
            if(!results){
                res.status(404),send('No Record Found');
            }
            else{
                res.json(results);
            }
        })
};

// Add Appointment
module.exports.addappointment = function (req, res) {
    var appoi = new appointment();

    appoi.Doctor_ID = req.body.Doctor_ID;
    appoi.Name = req.body.Name;
    appoi.Email = req.body.Email;
    appoi.Phone_Number = req.body.Phone_Number;
    appoi.DateAppoi = req.body.DateAppoi;
    // appoi.Time = req.body.Time;


    appoi.save(function (error, results) {
        if (error) throw error;
        console.log('Appointment Successfully Added.');
        res.json(results);
    });
};

// Delete Appointment
module.exports.deleteappointment = (req, res) => {

    appointment.findOneAndDelete(
        { 
            _id : req.body.id 
        },
        (err, result) => {
        if (err) return res.send(500, err)
        res.json(result);
        console.log('Appointment Deleted');
    });
};
