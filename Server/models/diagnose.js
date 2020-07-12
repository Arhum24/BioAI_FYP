var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('mongoose-type-email');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var DiagnoseSchema = new Schema(
    {
        Patient_ID:{
            type:String
        },
        Doctor_ID:{
            type:String
        },
        DiseaseName:{
            type:String,
            max:400
        },
        Tests:{
            type:[String]
        },
        Medicines:{
            type:[String]
        },
        Medicine_Notes:{
            type:[String]
        },
        Symptoms:{
            type:[String]
        },
        Findings:{
            type:[String]
        },
        Recommended_Foods:{
            type:[String]
        },
        Preventive_Foods:{
            type:[String]
        },
        Diet_Note:{
            type:String
        },
        Comments:{
            type:String
        },
        Date:{
            type:Date,
            default:Date.now
        },
        Image:{
            data: Buffer,
            contentType: String
        }

    }
)

module.exports = mongoose.model('diagnosis',DiagnoseSchema);