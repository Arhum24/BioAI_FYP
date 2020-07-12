var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var MedicineSchema = new Schema(
    {
        Name:{
            type:String,
            unique:true,
            max:400
        },
        Description:{
            type:String,
            max:400
        },
        Dosage:{
            type:Number
        }

    }
)

module.exports = mongoose.model('medicine',MedicineSchema);