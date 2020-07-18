import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
//dob KO KESE CALCULATE KERNA HAI OR KESE EDIT KERNA HAI??????
//MERE KHAYAL SE DO ATTRIBUTE HONE CHAHIYE.....PEHLE TO AIK DOB KA OR AIK AUTO GENGERATED AGE KA''''''

function EditPatientPersonal(props) {
    let name = props.toEditPatientName;
    let dob = props.toEditPatientDOB;
    let gender = props.toEditPatientGender;
    // let gender = "Male";
    let phone = props.toEditPatientPhone;
    let address = props.toEditPatientAddress;
    let email = props.toEditPatientEmail;
    let cnic = props.toEditPatientCNIC;
    console.log("toEditName = " + name);
    const [PatientName, setPatientName] = useState(name)
    console.log("toEditAge = " + dob);
    const [PatientDOB, setPatientDOB] = useState(dob)
    console.log("toEditGender = " + gender);
    const [PatientGender, setPatientGender] = useState(gender)
    console.log("toEditPhone = " + phone);
    const [PatientPhone, setPatientPhone] = useState(phone)
    console.log("toEditAddress = " + address);
    const [PatientAddress, setPatientAddress] = useState(address)
    console.log("toEditAddress = " + address);
    const [PatientEmail, setPatientEmail] = useState(email)
    console.log("toEditAddress = " + address);
    const [PatientCNIC, setPatientCNIC] = useState(cnic)


    const handleDateChange = (date) => {
        setPatientDOB(date);
    };
    const handleGenderChange = (event) => {
        setPatientGender(event.target.value);


    }
    useEffect(() => {
        setPatientName(name);

        setPatientDOB(dob);

        setPatientGender(gender);

        setPatientPhone(phone);

        setPatientAddress(address);
        setPatientEmail(email);
        setPatientCNIC(cnic);


    }, [])

    const handleInputChange = event => {

        switch (event.target.name) {
            case 'name':
                setPatientName(event.target.value); return;
            case 'dob':
                setPatientDOB(event.target.value); return;
            case 'gender':
                setPatientGender(event.target.value); return;
            case 'phone':
                setPatientPhone(event.target.value); return;
            case 'address':
                setPatientAddress(event.target.value); return;
            case 'email':
                setPatientEmail(event.target.value); return;
            case 'cnic':
                setPatientCNIC(event.target.value); return;
            default:
                throw new Error();
        }
        // setPatientName(event.target.value);
    }
    const confirm = () => {

        props.handleEditPatientConfirm(PatientName, PatientDOB, PatientGender, PatientPhone, PatientAddress, PatientEmail, PatientCNIC);
    }

    return (
        <div>

            <Dialog open={props.openPatientEdit} onClose={props.handleEditPatientClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ background: "linear-gradient(to right, #38D4D7, #37ACEB)", color: "white" }}>Edit Patient's Personal Information <EditIcon style={{ fontSize: "1.8em", float: "right" }} /></DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: "black" }}>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="PatientName"
                        label="Name"
                        name="name"
                        type="text"
                        fullWidth
                        value={PatientName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="PatientPhone"
                        label="Phone Number"
                        type="number"
                        name="phone"
                        fullWidth
                        value={PatientPhone}
                        onChange={handleInputChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="PatientEmail"
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        value={PatientEmail}
                        onChange={handleInputChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="PatientCNIC"
                        label="CNIC"
                        type="number"
                        name="cnic"
                        fullWidth
                        value={PatientCNIC}
                        onChange={handleInputChange}
                    />
                    <div style={{ float: "left" }} >

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">

                                <KeyboardDatePicker
                                    color="red"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date Of Birth"
                                    format="dd/MM/yyyy"
                                    name="dob"
                                    fullWidth
                                    orientation="landscape"
                                    value={PatientDOB}
                                    inputVariant="outlined"
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                            </Grid>
                        </MuiPickersUtilsProvider>
                        <div sytle={{ marginTop: "4em" }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" color="#37ACEB">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender" value={PatientGender} onChange={handleGenderChange}>
                                    <FormControlLabel value="Female" control={<Radio style={{ color: "#37ACEB" }} />} label="Female" />
                                    <FormControlLabel value="Male" control={<Radio style={{ color: "#37ACEB" }} />} label="Male" />
                                    <FormControlLabel value="Other" control={<Radio style={{ color: "#37ACEB" }} />} label="Other" />

                                </RadioGroup>
                            </FormControl></div>
                    </div>
                    <br></br>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="PatientAddress"
                        label="Address"
                        name="address"
                        type="text"
                        fullWidth
                        multiline
                        value={PatientAddress}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handlePatientEditClose} color="secondary">
                        Cancel
                     </Button>
                    <Button onClick={confirm} style={{ color: "#37ACEB" }}>
                        Confirm Change
        </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default EditPatientPersonal;
