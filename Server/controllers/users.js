var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var users = require('../models/users');
var db = mongoose.connection;
var dburl = 'mongodb://localhost:27017/BioAI';
var bcrypt = require('bcryptjs');
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

// Find User
module.exports.getuser = (req, res, next) => {
    
    users.findOne({
        email: req.body.email
    })
        .exec(function (error, results) {
            var passwordIsValid = bcrypt.compareSync(req.body.password, results.password);
            if (error) {
                return next(error);
            }
            // If valid user was not found, send 404
            if (!results) {
                res.status(404).send('No Record Found');
            }
            if(results.email != req.body.email){
                res.send('Incorrect Email');
            }
            if(!passwordIsValid){
                res.send('Incorrect Password');
            }
            else {
                // Respond with valid data
                res.json(results);
            }
        });
};

// Add Users
module.exports.adduser = function (req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var user = new users();

    user.active = req.body.active;
    user.name = req.body.name;
    user.cnic = req.body.cnic;
    user.licence = req.body.licence;
    user.licence_verified = req.body.licence_verified;
    user.licence_image = req.body.licence_image;
    user.email = req.body.email;
    user.email_verified = req.body.email_verified;
    user.password = hashedPassword;
    user.hospital = req.body.hospital;
    user.qualification = req.body.qualification;
    user.phone_number = req.body.phone_number;
    user.phone_number_verified = req.body.phone_number_verified;
    user.date = req.body.date;
    user.image = req.body.image;


    user.save(function (error, results) {
        if (error) throw error;
        console.log('User successfully saved.');
        res.json(results);
    });
};

// Delete User
module.exports.deleteuser = (req, res) => {

    users.findOneAndDelete(
        { 
            email: req.body.email 
        },
        (err, result) => {
        if (err) return res.send(err)
        res.json(result);
        console.log('User Deleted');
    });
};
