import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { Typography, Button } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import EditPatientPersonal from "./EditPatientPersonal";
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Patient from "./Patient";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Message } from 'shineout'
const PatientProfile = (props) => {
    const [openEditPersonal, setOpenEditPersonal] = useState(false);
    const [toEditPatientName, setEditName] = useState(null);
    const [toEditPatientDOB, setEditDOB] = useState(null);
    const [toEditPatientGender, setEditGender] = useState(null);
    const [toEditPatientEmail, setEditEmail] = useState(null);
    const [toEditPatientCNIC, setEditCNIC] = useState(null);
    const [toEditPatientPhone, setEditPhone] = useState(null);
    const [toEditPatientAddress, setEditAddress] = useState(null);
    const [patient, setPatient] = useState(props.patient);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const [failureMessage, setFailureMessage] = React.useState("");
    useEffect(() => {
        setSuccess(false);
        setFailure(false);
        setPatient(props.patient);
        setEditName(patient.Name);
        setEditPhone(patient.Phone_Number);
        setEditAddress(patient.Address);
        setEditDOB(patient.DOB);
        setEditGender(patient.Gender);
        setEditEmail(patient.Email);
        setEditCNIC(patient.CNIC);




    });
    const handleSnackClick = () => {
        setOpenSnack(true);
    };
    const calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        console.log(age_now + ":  Age");
        return age_now;
    }
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    const handlePatientEditClose = () => {
        setOpenEditPersonal(false);

    };
    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: "#38D4D7",
            color: 'white',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }))(Tooltip);
    const handlePatientEditConfirm = async (Name, DOB, Gender, Phone, Address, Email, CNIC) => {

        console.log(patient._id)
        async function putPatient() {
            let token = localStorage.getItem("token");
            let result = "";
            try {
                await fetch("http://localhost:8000/api/auth/patient/" + patient._id, {
                    method: 'PUT',

                    body: new URLSearchParams({

                        'Doctor_ID': patient.Doctor_ID,
                        'Name': Name,
                        // 'LastName': patient.LastName,
                        'Height': patient.Height,
                        'Weight': patient.Weight,
                        'Pulse': patient.Pulse,
                        'Blood_Pressure': patient.Blood_Pressure,
                        'Blood_Group': patient.Blood_Group,
                        'Allergies': patient.Allergies,
                        'Operation': patient.Operation,
                        'Email': Email,
                        'Gender': Gender,
                        'CNIC': CNIC,
                        'Phone_Number': Phone,
                        'Address': Address,
                        'DOB': DOB,
                        'Comorbidity': patient.Comorbidity,
                        'MartialStaus': patient.MartialStatus


                    }),
                    headers: {
                        'x-access-token': token, "Access-Control-Allow-Origin": "*",
                    },

                }).then((response) => response.json()).then((data) => {
                    result = data
                    console.log(data)
                    if (!data.error) {

                        setSuccess(true);
                        props.history.push('/PatientsMain')

                    } else {

                        setFailureMessage("Unsuccessful Edit. Make sure you have entered correct data.")
                        setFailure(true);
                    }

                })
                return result

            } catch (err) {
                setFailureMessage("Server Error")
                setFailure(true);
                return err
            }



        };
        var a = putPatient();
        console.log("-*-***-**-*--*-");
        console.log(a);
        // handleSnackClick();

        setOpenEditPersonal(false);

    }

    const StyledEditButton = withStyles((theme) => ({
        root: {
            background: "linear-gradient(to right,  #37ACEB,#38D4D7)",
            color: theme.palette.common.white,

            '&:hover': {
                background: "linear-gradient(to right, #38D4D7,#37ACEB)"

            }


        },
    }))(Button);
    return (
        <div style={{}} >

            {success ? Message.success(<div style={{ width: 240 }}>Patient Profile Edited Successfully</div>, 8, {
                position: "bottom-right",
                title: 'Sucessfully Added',
            }) : failure && Message.warn(<div style={{ width: 240 }}>{failureMessage}</div>, 0, {
                position: "bottom-right",
                title: 'Error',
            })}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Patient Information Edited Successfully"
                action={
                    <React.Fragment>

                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <div style={{ background: "linear-gradient(to right,  #37ACEB,#38D4D7)", height: "25.1rem", justifyContent: "center", padding: 0, margin: 0 }}></div>
            <div style={{ textAlign: "center", justifyContent: "center", position: "relative", zIndex: 1, top: "50%", margin: "-15rem 0 0 -0rem" }}>
                <div style={{ marginLeft: "auto", marginRight: "auto", display: "Block", width: "20rem" }}>
                    <Avatar style={{
                        marginTop: "-4%", width: "90px", height: "90px", marginLeft: "auto", marginRight: "auto",
                    }} alt="" src={require('../static/images/avatar/male_avatar.png')} /></div>
                <div style={{ marginLeft: "auto", marginRight: "auto", display: "Block", width: "20rem" }}>
                    <Typography style={{ marginTop: "7px", marginLeft: "auto", marginRight: "auto", width: 180, color: "white" }}>{patient.Name}</Typography>

                </div>
            </div>

            <div className="Profile" >
                {openEditPersonal === true &&
                    <EditPatientPersonal
                        openPatientEdit={openEditPersonal}
                        handlePatientEditClose={handlePatientEditClose}
                        handleEditPatientConfirm={handlePatientEditConfirm}
                        toEditPatientName={toEditPatientName}
                        toEditPatientDOB={toEditPatientDOB}
                        toEditPatientGender={toEditPatientGender}
                        toEditPatientPhone={toEditPatientPhone}
                        toEditPatientAddress={toEditPatientAddress}
                        toEditPatientEmail={toEditPatientEmail}
                        toEditPatientCNIC={toEditPatientCNIC}


                    />
                }
                <table >
                    <tbody>
                        <tr>
                            <td className="row_head">Name: </td>
                            <td>{patient.Name} </td>
                        </tr>
                        <LightTooltip title={patient.DOB} TransitionComponent={Zoom} placement="top-end" interactive>
                            <tr>
                                <td className="row_head">Age: </td>
                                <td>{calculate_age(patient.DOB)} </td>
                            </tr>
                        </LightTooltip>
                        <tr>
                            <td className="row_head">Gender: </td>
                            <td>{patient.Gender} </td>
                        </tr>
                        <tr>
                            <td className="row_head">Email: </td>
                            <td>{patient.Email} </td>
                        </tr>
                        <tr>
                            <td className="row_head">CNIC: </td>
                            <td>{patient.CNIC} </td>
                        </tr>
                        <tr>
                            <td className="row_head">Phone: </td>
                            <td>{patient.Phone_Number} </td>
                        </tr>
                        <tr>
                            <td className="row_head">Address: </td>
                            <td>{patient.Address} </td>
                        </tr>

                        <tr>
                            <td className="row_head">
                                <StyledEditButton
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<EditIcon />}
                                    onClick={() => {
                                        setOpenEditPersonal(true);
                                    }}
                                >
                                    Edit
                          </StyledEditButton>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div >

    );
};
export default PatientProfile;
