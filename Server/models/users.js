var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
// var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        active:{
            type:Boolean,
            default: true
        },
        name:{
            type:String,
            required:true,
            max:120
        },
        cnic:{
            type:Number,
            required:true,
            unique:true
        },
        licence:{
            type:String,
            required:true,
            unique:true,
            max:15
        },
        licence_country:{
            type:String,
            required:true
        },
        licence_verified:{
            type:Boolean,
            default: false
        },
        licence_image:{
            data: Buffer, 
            contentType: String
        },
        email:{
            type:mongoose.SchemaTypes.Email,
            required:true,
            unique:true,
            max:255
        },
        email_verified:{
            type:Boolean,
            default: true
        },
        password:{
            type:String,
            required:true,
            min:8,
            max:20
        },
        hospital:{
            type:String,
            required:true,
            max:120
        },
        qualification:{
            type:String,
            required:true,
            max:120
        },
        phone_number:{
            type:String,
            required:true,
            min:9,
            max:17
        },
        phone_number_verified:{
            type:Boolean,
            default: false
        },
        date:{
            type:Date,
            default:Date.now
        },
        image:{
            data: Buffer, 
            contentType: String
        }

    }
)

module.exports = mongoose.model('users',UserSchema);
