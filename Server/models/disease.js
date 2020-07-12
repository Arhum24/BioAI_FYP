var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var DiseaseSchema = new Schema(
    {
        Name:{
            type:String,
            max:1000
        },
        Description:{
            type:String,
            max:1000
        }

    }
)

module.exports = mongoose.model('disease',DiseaseSchema);