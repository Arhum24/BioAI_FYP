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
var disease = require('../models/disease');
var db = mongoose.connection;
// var dburl = 'mongodb://localhost:27017/BioAI';
var dburl = 'mongodb+srv://BioAIDB:WrongPassword@bioaidb.ecnap.gcp.mongodb.net/BioAIDB?retryWrites=true&w=majority';

try{
// DB connection
db.on('error', function () {
    console.log('There was an Error Communicating with Database');
});
mongoose.connect(dburl, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true },function (err) {
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
  

// All Diseases
router.get('/disease', [VerifyToken, Permissions], (req, res) => {
    disease.find({
        
    })
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

// Add Disease
router.post('/disease', [VerifyToken, Permissions], (req, res) => {
    var dis = new disease();

    dis.Name = req.body.Name;
    dis.Description = req.body.Description;

    dis.save(function (error, results) {
        if (error) res.json(error);
        console.log('Disease Successfully Added.');
        res.json(results);
        res.send("Added");
    });
});

module.exports = router;
}
catch(err){
    var error = JSON.parse(err);
    console.log(error);
}