var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var PrescriptionSchema = new Schema(
    {
        Diagnosis_ID:{
            type:String
        },
        Medicines:{
            type:[String]
        },
        Note:{
            type:String,
            max:5000
        },
        Date:{
            type:Date,
            default:Date.now
        }

    }
)

module.exports = mongoose.model('prescription',PrescriptionSchema);