var express = require('express');
var mongoose = require('mongoose');
var disease = require('../models/disease');
var diagnose = require('../models/diagnose');
var patient = require('../models/patient');
var appoi = require('../models/appointment');
const moment = require('moment');

try {
    module.exports.graphDate = (req, res) => {
        console.log("IN GRAPH DATAW",req.params.Did);
        patient.aggregate([
            {
                $match:
                {
                    
                    Doctor_ID : req.params.Did
                }
            },

            {
                $project:
                {
                    "month": { $month: '$DateReg' },
                    "year": { $year: '$DateReg' },
                    
                }
            },

            {
                "$group":
                {
                    "_id": { "month": "$month", "year": "$year" }

                    , "count": { "$sum": 1 }
                }
            }

        ]).exec((err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(result);
                console.log(result);
            }
        }
        )
        // patient.aggregate(
        //     [
        //         {
        //             $match:
        //                 { 'Doctor_ID': req.params.Did }
        //         },
        //         {
        //             $project:
        //             {
        //                 month: { $month: "$DateReg" }
        //             }
        //         },
        //         {
        //             $group:
        //             {
        //                 _id: "month",

        //                 PatientCountMonth: { $sum: 1 }
        //             }
        //         }

        //     ]
        // ).exec((err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         res.json(result);
        //         console.log(result);
        //     }
        // }
        // )
        // //
        // patient.aggregate(
        //     [
        //         {
        //             $match:
        //                 { 'Doctor_ID': req.params.Did }
        //         },
        //         {
        //             $project:
        //             {
        //                 year: { $year: "$DateReg" }
        //             }
        //         },
        //         {
        //             $group:
        //             {
        //                 _id: "year",

        //                 PatientCountYear: { $sum: 1 }
        //             }
        //         }

        //     ]
        // ).exec((err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         res.json(result);
        //         console.log(result);
        //     }
        // }
        // )
        // patient.aggregate([
        //     {
        //         $project:
        //         {
        //             month: { $month: "$DateReg" },
        //             year: { $year: "$DateReg" }
        //         }
        //     },
        //     {
        //         $match: { year: id }
        //     },
        //     {
        //         $group:
        //         {
        //             _id: { month: $month, year: $year }

        //             , count: { $sum: 1 }
        //         }
        //     }
        // ]).exec((err, qu) => {
        //     if (err) {
        //         return res.status(404).json({
        //             status: 'Failure',
        //             message: 'Could not Retrieve Dates'
        //         })
        //     }
        //     else {
        //         res.status(200).json({
        //             status: 'Success',
        //             data: qu
        //         })
        //     }
        // })
        // if (!qu) {
        //     return res.status(404).json({
        //         status: 'failure',
        //         message: 'Could not Retrieve Dates'
        //     })
        // }


        // res.status(200).json({
        //     status: 'Success',
        //     data: qu
        // })
    };

    module.exports.graphDisease = (req, res) => {
        // disease.countDocuments({}, (err, qu) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         res.json(qu);
        //         console.log(qu);
        //     }
        // })
        diagnose.aggregate([
            { $unwind: 
                "$Findings" 
            }
            ,
            { $group: 
                { 
                    "_id": "$Findings", 
                    "count": { $sum: 1 } 
                }
            }
            ,
            {
                $group: {
                    "_id": null, 
                    "Diseases": {
                        $push: {
                            "Findings": "$_id",
                            "count": "$count"
                        }
                    }
                }
            }
            ,
            { 
                $project: {
                     "_id": 0, 
                     "Diseases": 1
                    } 
            }
        ]).exec((err, qu) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.json(qu);
                        console.log(qu);
                    }
                })

    };

    module.exports.firstPatients = (req, res) => {
        var pa = patient.find({ Doctor_ID: req.params.Did });
        pa.limit(5);
        pa.sort({ DateReg: "desc" });
        pa.exec((err, qu) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(qu);
                console.log(qu);
            }
        }
        );
        // aggregate([
        //     {
        //         $sort:
        //         {
        //             DateReg: 1
        //         }
        //     },
        //     {
        //         $limit: 1
        //     }
        // ]).exec((err, qu) => {
        //     if (err) {
        //         return res.status(404).json({
        //             status: 'Failure',
        //             message: 'Could not Retrieve 5 Patients'
        //         })
        //     }
        //     else {
        //         res.status(200).json({
        //             status: 'Success',
        //             data: qu
        //         })
        //     }
        // })
    };

    module.exports.allPatients = (req, res) => {
        patient.countDocuments({ Doctor_ID: req.params.Did }, (err, qu) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({count:qu});
                console.log(qu);
            }

        })
        // patient.aggregate([
        //     {
        //         $group:
        //         {
        //             _id: null,
        //             Patient_Count:
        //             {
        //                 $sum: 1
        //             }
        //         }
        //     },
        //     {
        //         $project:
        //         {
        //             _id: 0
        //         }
        //     }
        // ]).exec((err, qu) => {
        //     if (err) {
        //         return res.status(404).json({
        //             status: 'Failure',
        //             message: 'Could not Retrieve All Patients'
        //         })
        //     }
        //     else {
        //         res.status(200).json({
        //             status: 'Success',
        //             data: qu
        //         })
        //     }
        // })
    };

    module.exports.allAppointments = (req, res) => {
        appoi.countDocuments({ Doctor_ID: req.params.Did }, (err, qu) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({count:qu});
                console.log(qu);
            }
        }
        )
        // appoi.aggregate([
        //     {
        //         $group:
        //         {
        //             _id: null,
        //             Appointment_Count:
        //             {
        //                 $sum: 1
        //             }
        //         }
        //     },
        //     {
        //         $project:
        //         {
        //             _id: 0
        //         }
        //     }
        // ]).exec((err, qu) => {
        //     if (err) {
        //         return res.status(404).json({
        //             status: 'Failure',
        //             message: 'Could not Retrieve All Appointments'
        //         })
        //     }
        //     else {
        //         res.status(200).json({
        //             data: qu
        //         })
        //     }
        // })
    };

    module.exports.WeekAppointment = (req, res) => {
        const today = moment().isoWeek();
        console.log(today);
        console.log("In weekly appointment route we have "+req.params.Did)
        console.log("Current Week is ",today)

        // const from_date = today.startOf('week');
        // const to_date = today.endOf('week');
        appoi.aggregate([
            {
                $match: {
                    Doctor_ID : req.params.Did
                    }
                    
                }
            ,
            {
                $project:
                {
                    "week": { $isoWeek: '$DateAppoi' }
                    ,
                    Doctor_ID : req.params.Did
                }
            },
            {
                $match: {
                    "week": {
                        $eq : today
                    }
                    
                }
            }
            ,
            {
                "$group":
                {
                    "_id": { "week": "$week" }

                    , "count": { "$sum": 1 }
                }
            }

        ]).exec((err, result) => {
            console.log("Error OR Result = ",result,err)
            console.log(result.length)
            if (err) {
                console.log("Error = ")
                console.log(err);
                console.log(err);
            }
            if(result.length===0){
                console.log("Result with 0 length = ")
                console.log(result);
                res.json([{count:0}])
            }
            else {
                res.json(result);
                console.log("Result = ")
                console.log(result);
            }
        }
        )



        
        // appoi.aggregate(
        //     [
        //         {
        //             $match: {
        //                 DateAppoi: {
        //                     $gte: from_date,
        //                     $lte: to_date
        //                 }
        //             }
        //         },
        //         {
        //             $count: "Weekly Appoi"
        //         }
        //     ]
        // ).exec((err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         res.json(result);
        //         console.log(result);
        //     }
        // }
        // )
        // appoi.aggregate(
        //     [
        //         {
        //             $match:
        //                 { 'Doctor_ID': req.params.Did }
        //         },
        //         {
        //             $project:
        //             {
        //                 week: { $week: "$DateAppoi" }
        //             }
        //         },
        //         {
        //             $group:
        //             {
        //                 _id: "week",
        //                 AppointmentWeek_Count: { $sum: 1 }
        //             }
        //         }
        //     ]
        // ).exec((err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         res.json(result);
        //         console.log(result);
        //     }
        // }
        // )
        // appoi.aggregate([
        //     {   
        //         $project:
        //         {
        //             week: { $week: "$DateAppoi" }
        //         }
        //     },
        //     {

        //         $group:
        //         {
        //             _id: null,
        //             AppointmentWeek_Count:
        //             {
        //                 $sum: 1
        //             }
        //         }
        //     },
        //     {
        //         $project:
        //         {
        //             _id: 0
        //         }
        //     }
        // ]).exec((err, qu) => {
        //     if (err) {
        //         return res.status(404).json({
        //             status: 'Failure',
        //             message: 'Could not Retrieve Weekly Appointments'
        //         })
        //     }
        //     else {
        //         res.status(200).json({
        //             data: qu
        //         })
        //     }
        // })
    };

    module.exports.Dashboard = (req, res) => {
        var Final;
        // var gd = this.graphDate();
        // var gdi = this.graphDisease();
        // var fp = this.firstPatients();
        // var ap = this.allPatients();
        // var aa = this.allAppointments();
        // var wa = this.WeekAppointment();
        var gd = patient.aggregate(
            [
                {
                    $match:
                        { 'Doctor_ID': req.params.Did }
                },
                {
                    $project:
                    {
                        month: { $month: "$DateReg" }
                    }
                },
                {
                    $group:
                    {
                        _id: "month",

                        PatientCountMonth: { $sum: 1 }
                    }
                }

            ]
        ).exec((err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
            }
        }
        )
        //
        patient.aggregate(
            [
                {
                    $match:
                        { 'Doctor_ID': req.params.Did }
                },
                {
                    $project:
                    {
                        year: { $year: "$DateReg" }
                    }
                },
                {
                    $group:
                    {
                        _id: "year",

                        PatientCountYear: { $sum: 1 }
                    }
                }

            ]
        ).exec((err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
            }
        }
        );

        var gdi = disease.countDocuments({}, (err, qu) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(qu);
            }
        });

        var fp = patient.find({ Doctor_ID: req.params.Did });
        pa.limit(5);
        pa.sort({ DateReg: "desc" });
        pa.exec((err, qu) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(qu);
            }
        }
        );

        var ap = patient.countDocuments({ Doctor_ID: req.params.Did }, (err, qu) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(qu);
            }

        });

        var aa = appoi.countDocuments({ Doctor_ID: req.params.Did }, (err, qu) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(qu);
            }
        }
        );

        var wa = appoi.aggregate(
            [
                {
                    $match:
                        { 'Doctor_ID': req.params.Did }
                },
                {
                    $project:
                    {
                        week: { $week: "$DateAppoi" }
                    }
                },
                {
                    $group:
                    {
                        _id: "week",
                        AppointmentWeek_Count: { $sum: 1 }
                    }
                }
            ]
        ).exec((err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res);
            }
        }
        );

        Final = '{ "Dashboard" : [' +
            { "Date Graph": gd }, +
            { "Disease Graph": gdi }, +
            { "First Patients": fp }, +
            { "All Patients": ap }, +
            { "All Appointments": aa }, +
            { "Week Appointments": wa }
        ']}';

        // Final = gd.concat(gdi.concat(fp.concat(ap.concat(aa.concat(wa)))));
        res.json(Final);
        console.log(Final);
    }
}
catch (err) {
    var error = JSON.parse(err);
    console.log(error);
}