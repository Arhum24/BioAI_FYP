import React, { Component } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { RepeatOneSharp } from '@material-ui/icons';
import moment from "moment";
export default class PDFShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Diagnosis Fields
            tests: "",
            medicines: [],
            medicine_notes: "",
            diseases: [],
            reco_foods: [],
            prev_foods: [],
            comments: "",
            diet_notes: "",
            // Patient Fields
            Name: "",
            Email: "",
            Phone_Number: "",
            DOB: "",
            Gender: "",
            Blood_Group: "",
            Pulse: "",
            Allergies: [],
            Operations: [],
            Comorbidity: [],
            Height: "",
            Weight: "",
            Name: "",
            DOB: "",
            Gender: "",
            Blood_Group: "",
            Pulse: "",
            Allergies: [],
            Operations: [],
            Comorbidity: [],
            Height: "",
            Weight: "",
            Diagnose_Date: "",
            Symptoms: []
        }
        this.printDocument = this.printDocument.bind(this);
    }
    printDocument() {
        const input = document.getElementById('pdfdiv');
        window.html2canvas = html2canvas;
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px"
            // format: [4, 2]
        })
        pdf.html(input, {
            callback: function (doc) {
                console.log("in callback");
                doc.save("download.pdf");
            }
        });
        //     html2canvas(input)
        //         .then((canvas) => {
        //             var imgWidth = 200;
        //             var pageHeight = 290;
        //             var imgHeight = canvas.height * imgWidth / canvas.width;
        //             var heightLeft = imgHeight;
        //             const imgData = canvas.toDataURL('image/png');
        //             const pdf = new jsPDF({
        //                 orientation: "portrait",
        //                 unit: "px"
        //                 // format: [4, 2]
        //             })
        //             // var position = -110;
        //             // var heightLeft = imgHeight;
        //             // pdf.addImage(imgData, 'JPEG', 0, -1000, imgWidth, imgHeight);
        //             // pdf.save("download.pdf");
        //             pdf.html(input, {
        //                 callback: function (doc) {
        //                     console.log("in callback");
        //                     doc.save("download.pdf");
        //                 }
        //             });
        //         });
    }

    async componentDidMount() {
        try {
            const tok = localStorage.getItem("token");
            // const profile = JSON.parse(localStorage.getItem('profile'));
            // const Did = profile._id;
            const Pid = this.props.location.passed.Patient_ID
            const Diagnosis_ID = this.props.location.passed.Diagnosis_ID
            console.log(Pid + "    " + Diagnosis_ID + "      " + tok)
            await fetch('http://localhost:8000/api/auth/diagnose/' + Diagnosis_ID,
                {
                    method: 'GET',
                    headers: {
                        'x-access-token': tok,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "Access-Control-Allow-Origin": "*",
                    }
                })
                .then((response) => response.json()).then((response) => {
                    console.log(response);
                    this.setState({
                        tests: response.Tests,
                        medicines: response.Medicines,
                        medicine_notes: response.Medicine_Notes,
                        diseases: response.Findings,
                        reco_foods: response.Recommended_Foods,
                        prev_foods: response.Preventive_Foods,
                        comments: response.Comments,
                        diet_notes: response.Diet_Note,
                        Diagnose_Date: response.Date,
                        Symptoms: response.Symptoms
                    });
                    // Fetch Patient data
                    fetch('http://localhost:8000/api/auth/patients/' + Pid,
                        {
                            method: 'GET',
                            headers: {
                                'x-access-token': tok,
                                'Content-Type': 'application/x-www-form-urlencoded',
                                "Access-Control-Allow-Origin": "*",
                            }
                        })
                        .then((response) => response.json()).then((res) => {
                            console.log("Patient DAta")
                            console.log(res[0].Name);
                            this.setState({
                                Name: res[0].Name,
                                Email: res[0].Email,
                                Phone_Number: res[0].Phone_Number,
                                DOB: res[0].DOB,
                                Gender: res[0].Gender,
                                Blood_Group: res[0].Blood_Group,
                                Pulse: res[0].Pulse,
                                Allergies: res[0].Allergies,
                                Operations: res[0].Operation,
                                Comorbidity: res[0].Comorbidity,
                                Height: res[0].Height,
                                Weight: res[0].Weight,
                            });
                        }
                        )

                }
                );
        } catch (error) {


        }
    }
    render() {

        return (


            <div style={{ width: 1240, height: 1754 }}>
                <div id="pdfdiv" style={{ fontSize: "8px" }}>



                    <table>

                        <tr style={{ textAlign: "center" }}>
                            <td>   <img src={require('../static/images/avatar/logo_transparent.png')} /></td>
                            <td colSpan="1" style={{ textAlign: "center" }}><h3 style={{ textAlign: "center" }}>BioAI</h3>

                                <h3 style={{ textAlign: "center" }}>Medical Report</h3>

                                <h3 style={{ textAlign: "center" }}>Dr. {JSON.parse(localStorage.getItem("profile")).name.toUpperCase()}</h3>

                                <h3 style={{ textAlign: "center" }}>{moment(this.state.Diagnose_Date).format("dddd, MMMM D, Y")}</h3>
                            </td>

                        </tr>



                        <tr>
                            <td style={{ borderLeft: "6px solid green" }}><h3>Personal Information</h3></td>
                        </tr>



                        <tr><td style={{ border: "1px dotted black", width: "200px" }} >Name</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Name}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Gender</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Gender}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Phone Number</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Phone_Number}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Blood Group</td ><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Blood_Group}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>DOB</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.DOB.substr(0, 10)}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Pulse</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Pulse}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Allergies</td ><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Allergies.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Operations</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Operations.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Comorbidity</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Comorbidity.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Height</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Height}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Weight</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.Weight}</td></tr>
                        <tr><td style={{ borderLeft: "6px solid green", width: "200px" }}><h3>Diagnosis Details</h3></td></tr>
                        <br></br>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Symptoms</td><td style={{ border: "1px dotted black", width: "210px" }} >{this.state.Symptoms.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Findings</td><td style={{ border: "1px dotted black", width: "210px" }} >{this.state.diseases.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Medicines</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.medicines.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Medicine_Notes</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.medicine_notes}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Recommended Food</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.reco_foods.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Preventive Foods</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.prev_foods.map((value) => { return value + "," })}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Diet Plan Instructions</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.diet_notes}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Tests</td><td style={{ border: "1px dotted black", width: "200px" }}>{this.state.tests}</td></tr>
                        <tr><td style={{ border: "1px dotted black", width: "200px" }}>Doctor's Comments</td><td style={{ border: "1px dotted black", width: "210px" }}>{this.state.comments}</td></tr>



                    </table>
                    {/* <Grid container spacing={3}>
                        <Grid item xs={6} style={{ textAlign: "center" }}>
                            <h1 style={{ float: "left" }}>BioAi</h1>
                            <Typography>Medical Report</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <h3> Patients  Information</h3>
                            <Typography style={{ textAlign: "left" }}>

                                Name: {this.state.Name}
            DOB: {this.state.DOB}
                                <br></br>
            Gender: {this.state.Gender}
                                <br></br>
            Blood_Group: {this.state.Blood_Group}
                                <br></br>
            Pulse: {this.state.Pulse}
                                <br></br>
            Allergies:{this.state.Allergies}
                                <br></br>
            Operations:{this.state.Operations}
                                <br></br>
            Comorbidity:{this.state.Comorbidity}
                                <br></br>
            Height:{this.state.Height}
                                <br></br>
            Weight:{this.state.Weight}
                                <br></br>

                            </Typography>



                        </Grid>
                        <Grid item xs={12}>
                            <h3> Diagnosis Details</h3>
                            <Typography style={{ textAlign: "left" }}>

                                Findings: {this.state.diseases}
Medicines: {this.state.medicines}
                                <br></br>
Medicine_Notes: {this.state.medicine_notes}
                                <br></br>
Recommended Food: {this.state.reco_foods}
                                <br></br>
Preventive Foods: {this.state.prev_foods}
                                <br></br>
Diet Plan Instructions:{this.state.diet_notes}
                                <br></br>


                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            Tests: {this.state.tests}
                            <br></br>
                        </Grid>
                        <Grid item xs={12}>
                            Doctor's Comments: {this.state.comments}
                            <br></br>
                        </Grid>

                    </Grid>

 */}




                </div>
                <Button style={{ marginLeft: "12%" }} onClick={this.printDocument} variant="contained" color="primary"> Generate PDF </Button>
            </div>
        );
    }
}

