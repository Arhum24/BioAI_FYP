var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
// var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var AdminSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            max:120
        },
        email:{
            type:mongoose.SchemaTypes.Email,
            required:true,
            unique:true,
            max:255
        },
        password:{
            type:String,
            required:true,
            min:8,
            max:20
        },
        phone_number:{
            type:String,
            required:true,
            min:9,
            max:17
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

module.exports = mongoose.model('Admin',AdminSchema);