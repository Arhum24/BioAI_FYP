import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import EditPatientMedical from './EditPatientMedical';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const MedicalInfor = (props) => {
    const [openEditMedical, setOpenEditMedical] = useState(false);
    const [toEditPatientHeight, setEditHeight] = useState(null);
    const [toEditPatientWeight, setEditWeight] = useState(null);
    const [toEditPatientBloodGroup, setEditBloodGroup] = useState(null);
    const [toEditPatientBloodPressure, setEditBloodPressure] = useState(null);
    const [toEditPatientAllergy, setEditAllergy] = useState([]);
    const [toEditPatientOperation, setEditOperation] = useState([]);
    const [toEditPatientComorbidity, setEditComorbidity] = useState([]);
    const [toEditPatientPulse, setEditPulse] = useState(null);
    const [patient, setPatient] = useState(props.patient);
    const [openSnack, setOpenSnack] = React.useState(false);
    useEffect(() => {
        setPatient(props.patient);
        setEditHeight(patient.Height);
        setEditWeight(patient.Weight);
        setEditBloodGroup(patient.Blood_Group);
        setEditBloodPressure(patient.Blood_Pressure);
        console.log("-----" + patient.Blood_Group + "  " + patient.Blood_Pressure + " ")
        setEditAllergy(patient.Allergies);
        console.log(patient.Allergies)
        setEditOperation(patient.Operation);
        console.log(patient.Operation)
        setEditComorbidity(patient.Comorbidity)
        setEditPulse(patient.Pulse)




    });

    const handleSnackClick = () => {
        setOpenSnack(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handlePatientMedicalEditClose = () => {
        setOpenEditMedical(false);

    };

    const handlePatientMedicalEditConfirm = async (Height, Weight, Pulse, BloodGroup, BloodPressure, Allergies, Operation, Comorbidity) => {

        console.log(patient._id)
        async function putPatient() {
            let token = localStorage.getItem("token");
            let result = "";
            try {
                await fetch("https://bioai-node.herokuapp.com/api/auth/patient/" + patient._id, {
                    method: 'PUT',

                    body: new URLSearchParams({

                        'Doctor_ID': patient.Doctor_ID,
                        'Name': patient.Name,
                        // 'LastName': patient.LastName,
                        'Height': Height,
                        'Weight': Weight,
                        'Pulse': Pulse,
                        'Blood_Pressure': BloodPressure,
                        'Blood_Group': BloodGroup,
                        'Allergies': Allergies,
                        'Operation': Operation,
                        // 'Email': Email,
                        'Gender': patient.Gender,
                        'CNIC': patient.CNIC,
                        'Phone_Number': patient.Phone_Number,
                        'Address': patient.Address,
                        'DOB': patient.DOB,
                        'Comorbidity': Comorbidity,
                        'MartialStaus': patient.MartialStatus


                    }),
                    headers: {
                        'x-access-token': token, "Access-Control-Allow-Origin": "*",
                    },

                }).then((response) => response.json()).then((data) => {
                    result = data

                })
                return result

            } catch (err) {

                return err
            }



        };
        var a = putPatient();
        console.log("-*-***-**-*--*-");
        console.log(a);
        handleSnackClick();
        props.history.push('/PatientsMain')
        setOpenEditMedical(false);
    }

    const StyledEditButton = withStyles((theme) => ({
        '@global': {
            '*::-webkit-scrollbar': {
                width: '1em',
                border: '1em',
                borderColor: "white"
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(55,100,160)',
                outline: '1px solid red'
            }
        }, root: {
            background: "linear-gradient(to right,  #37ACEB,#38D4D7)",
            color: theme.palette.common.white,
            '&:hover': {
                background: "linear-gradient(to right, #38D4D7,#37ACEB)"

            }
            ,
            display: "left"
        },
    }))(Button);
    return (
        <div className="MedicalInfo">
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Patient Medical Information Edited Successfully"
                action={
                    <React.Fragment>

                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            {openEditMedical === true &&
                <EditPatientMedical
                    openPatientEdit={openEditMedical}
                    handlePatientMedicalEditClose={handlePatientMedicalEditClose}
                    handlePatientMedicalEditConfirm={handlePatientMedicalEditConfirm}
                    toEditPatientHeight={toEditPatientHeight}
                    toEditPatientWeight={toEditPatientWeight}
                    toEditPatientPulse={toEditPatientPulse}
                    toEditPatientBloodGroup={toEditPatientBloodGroup}
                    toEditPatientBloodPressure={toEditPatientBloodPressure}
                    toEditPatientAllergy={toEditPatientAllergy}
                    toEditPatientOperation={toEditPatientOperation}
                    toEditPatientComorbidity={toEditPatientComorbidity}


                />
            }
            <table>
                <tbody className="table table-striped">

                    <tr >
                        <td><label>Height: </label></td>
                        <td><Typography>  {patient.Height} cm</Typography></td>
                    </tr>
                    <tr >
                        <td> <label >Weight: </label></td>
                        <td> <Typography> {patient.Weight} KG</Typography></td>
                    </tr>
                    <tr s>
                        <td> <label >Blood Group: </label></td>
                        <td> <Typography >{patient.Blood_Group}</Typography></td>
                    </tr>
                    <tr >
                        <td> <label  >Blood Pressure: </label></td>
                        <td>  <Typography > {patient.Blood_Pressure}</Typography></td>
                    </tr>
                    <tr >
                        <td> <label  >Pulse: </label></td>
                        <td>  <Typography > {patient.Pulse}</Typography></td>
                    </tr>
                    <tr >
                        <td><label  >Allergy: </label></td>
                        <td>  <Typography > {patient.Allergies.map((value) => { return value + " " })}</Typography></td>
                    </tr>
                    <tr >
                        <td> <label >Previous Operation: </label></td>
                        <td> <Typography> {patient.Operation.map((value) => { return value + " " })}</Typography></td>
                    </tr>
                    <tr >
                        <td><label > Comorbidity: </label></td>
                        <td> <Typography> {patient.Comorbidity.map((value) => { return value + " " })}</Typography></td>
                    </tr>
                    <tr>
                        <td>
                            <StyledEditButton
                                variant="contained"
                                color="secondary"
                                startIcon={<EditIcon />}
                                onClick={() => {
                                    setOpenEditMedical(true);
                                }}
                            >
                                Edit
                          </StyledEditButton>

                        </td>
                    </tr>
                </tbody>
            </table>

        </div>


    );
}
export default MedicalInfor;
