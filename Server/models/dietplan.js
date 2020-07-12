var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var DPSchema = new Schema(
    {
        Diagnosis_ID:{
            type:String
        },
        Food:{
            type:String,
            max:4000
        },
        Instruction:{
            type:String,
            max:1000
        }

    }
)

module.exports = mongoose.model('dietplan',DPSchema);