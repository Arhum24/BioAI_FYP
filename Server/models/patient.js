var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var PatientSchema = new Schema(
    {
        Doctor_ID:{
            type:String
        },
        Name:{
            type:String,
            required:true,
            max:400
        },
        Height:{
            type:Number,
            // required:true,
            max:300
        },
        Weight:{
            type:Number,
            // required:true,
            max:900
        },
        Gender:{
            type:String,
            required:true,
            max:25
        },
        Maritial_Status:{
            type:String,
            required:true,
            max:25
        },
        Blood_Group:
        {
            type:String,
            max:3
        },
        Pulse:{
            type:String,
            max:500
        },
        Blood_Pressure:{
            type:Number,
            max:500
        },
        Allergies:{
            type:[String]
        },
        Operation:{
            type:[String]
        },
        Comorbidity:{
            type:[String]
        },
        Email:{
            type:mongoose.SchemaTypes.Email,
            // required:true,
            // unique:true,
            max:255,
        },
        CNIC:{
            type:Number,
            required:true,
            unique:true,
            
        },
        Phone_Number:{
            type:String,
            required:true,
            
            min:9,
            max:17

        },
        Address:{
            type:String
        },
        DOB:{
            type:Date,
            null:true
        },
        DateReg:{
            type:Date,
            default:Date.now
        }

    }
)

module.exports = mongoose.model('patients',PatientSchema);