var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema(
    {
        Doctor_ID:{
            type:String
        },
        Name:{
            type:String,
            required:true,
            max:400
        },
        Email:{
            type:mongoose.SchemaTypes.Email,
            // required:true,
            // unique:true,
            max:255
        },
        Phone_Number:{
            type:Number,
            required:true
        },
        DateAppoi:{
            type:Date,
            required:true
        }
        // ,
        // Time:{
        //     type : Date, 
        //     default: Date.now
        // }

    }
)

module.exports = mongoose.model('appointments',AppointmentSchema);