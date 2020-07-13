import React, { useState, useEffect } from "react";

import { InputLabel } from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
import {
    Typography,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl
} from "@material-ui/core";
//weight KO KESE CALCULATE KERNA HAI OR KESE EDIT KERNA HAI??????
//MERE KHAYAL SE DO ATTRIBUTE HONE CHAHIYE.....PEHLE TO AIK weight KA OR AIK AUTO GENGERATED AGE KA''''''
import ChipInput from "material-ui-chip-input";
function EditPatientMedical(props) {
    let height = props.toEditPatientHeight;
    let weight = props.toEditPatientWeight;
    // let pulse = props.toEditPatientPulse;
    let pulse = props.toEditPatientPulse;
    let bloodgroup = props.toEditPatientBloodGroup;
    let bloodpressure = props.toEditPatientBloodPressure;
    let Allergies = props.toEditPatientAllergy[0].split(',');
    let Operation = props.toEditPatientOperation[0].split(',');
    let Comorbidity = props.toEditPatientComorbidity[0].split(',');
    const StyledChipInput = withStyles((theme) => ({
        chip: {
            color: "white",

            backgroundColor: "#5A75D6",
            borderColor: "#5A75D6",
            '&:hover': {
                background: "white",
                color: "black",
                border: "1px black",
            },
        },
    }))(ChipInput);
    const [PatientHeight, setPatientHeight] = useState(height)

    const [PatientWeight, setPatientWeight] = useState(weight)

    const [PatientPulse, setPatientPulse] = useState(pulse)

    const [PatientBloodGroup, setPatientBloodGroup] = useState(bloodgroup)

    const [PatientBloodpressure, setPatientBloodpressure] = useState(bloodpressure)
    const [PatientAllergies, setPatientAllergies] = useState(Allergies)
    const [PatientOperation, setPatientOperation] = useState(Operation)
    const [PatientComorbidity, setPatientComorbidity] = useState(Comorbidity)
    useEffect(() => {
        setPatientHeight(height);

        setPatientWeight(weight);

        setPatientPulse(pulse);

        setPatientBloodGroup(bloodgroup);

        setPatientBloodpressure(bloodpressure);

        setPatientAllergies(Allergies);
        console.log(PatientAllergies)

        setPatientOperation(Operation);
        console.log(PatientOperation)

        setPatientComorbidity(Comorbidity);
        console.log(PatientComorbidity)
    }, [])

    const handleAddAllergiesChip = chips_ => {
        let chips_all = PatientAllergies;
        if (chips_ !== "")
            chips_all.push(chips_);

        setPatientAllergies(chips_all)
    };
    const handleAddOperationChip = chips_ => {
        let chips_all = PatientOperation;
        if (chips_ !== "")
            chips_all.push(chips_);

        setPatientOperation(chips_all)
    };
    const handleAddComorbidityChip = chips_ => {
        let chips_all = PatientComorbidity;
        if (chips_ !== "")
            chips_all.push(chips_);

        setPatientComorbidity(chips_all)
    };
    const handleDeleteAllergiesChip = (chips_, index) => {
        let chips_all = PatientAllergies;
        chips_all = chips_all.filter(x => x !== chips_);
        setPatientAllergies(chips_all);

    };
    const handleDeleteOperationsChip = (chips_, index) => {
        let chips_all = PatientOperation;
        chips_all = chips_all.filter(x => x !== chips_);
        setPatientOperation(chips_all);

    };
    const handleDeleteComorbidityChip = (chips_, index) => {
        let chips_all = PatientComorbidity;
        chips_all = chips_all.filter(x => x !== chips_);
        setPatientComorbidity(chips_all);

    };


    const handleChange = event => {

        switch (event.target.name) {
            case 'height':
                setPatientHeight(event.target.value); return;
            case 'weight':
                setPatientWeight(event.target.value); return;
            case 'pulse':
                setPatientPulse(event.target.value); return;
            case 'blood_group':
                setPatientBloodGroup(event.target.value); return;
            case 'blood_pressure':
                setPatientBloodpressure(event.target.value); return;
            default:
                throw new Error();
        }
        // setPatientHeight(event.target.value);
    }
    const confirm = (e) => {
        e.preventDefault();
        props.handlePatientMedicalEditConfirm(PatientHeight, PatientWeight, PatientPulse, PatientBloodGroup, PatientBloodpressure, PatientAllergies, PatientOperation, PatientComorbidity);
    }

    return (
        <div>
            <Dialog open={props.openPatientEdit} onClose={props.handleEditPatientClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#5A75D6", color: "white" }}>Edit Patient's Medical Information <EditIcon style={{ fontSize: "1.8em", float: "right" }} /></DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: "black" }}>

                    </DialogContentText>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="PatientHeight"
                            label="Height(cm)"
                            name="height"
                            type="number"
                            fullWidth
                            value={PatientHeight}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="PatientWeight"
                            label="Weight(Kg)"
                            type="number"
                            name="weight"
                            fullWidth
                            value={PatientWeight}
                            onChange={handleChange}
                        />



                        <FormControl>
                            <InputLabel htmlFor="name-multiple" style={{ marginLeft: 5 }}>Blood Group</InputLabel>
                            <Select


                                value={[PatientBloodGroup]}
                                onChange={handleChange}
                                label="--Blood Group--"
                                name="blood_group"
                                displayEmpty
                                variant="outlined"
                                autoWidth

                            >
                                <MenuItem value="" disabled>
                                    <em>{PatientBloodGroup}</em>
                                </MenuItem>
                                <MenuItem value={"A+"}>A+</MenuItem>
                                <MenuItem value={"A-"}>A-</MenuItem>
                                <MenuItem value={"AB+"}>AB+</MenuItem>
                                <MenuItem value={"AB-"}>AB-</MenuItem>
                                <MenuItem value={"B+"}>B+</MenuItem>
                                <MenuItem value={"B-"}>B-</MenuItem>
                                <MenuItem value={"O+"}>O+</MenuItem>
                                <MenuItem value={"O-"}>O-</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="PatientPulse"
                            label="Pulse"
                            name="pulse"
                            type="number"
                            fullWidth
                            value={PatientPulse}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="PatientBloddPressure"
                            label="Blood Pressure"
                            type="number"
                            name="blood_pressure"
                            fullWidth
                            value={PatientBloodpressure}
                            onChange={handleChange}
                        />





                        <StyledChipInput
                            value={PatientAllergies}
                            onAdd={chips => handleAddAllergiesChip(chips)}
                            onDelete={(chips, index) => handleDeleteAllergiesChip(chips, index)}
                            fullWidth
                            variant="outlined"
                            placeholder="Allergies (If any)"
                            style={{ marginTop: 10 }}
                        // className={classes.inputs_last}
                        />


                        <StyledChipInput
                            value={PatientOperation}
                            onAdd={chips => handleAddOperationChip(chips)}
                            onDelete={(chips, index) => handleDeleteOperationsChip(chips, index)}
                            fullWidth
                            variant="outlined"
                            placeholder="Previous Operation(If any)"
                            style={{ marginTop: 10 }}
                        // className={classes.inputs_last}
                        />




                        <StyledChipInput
                            value={PatientComorbidity}
                            onAdd={chips => handleAddComorbidityChip(chips)}
                            onDelete={(chips, index) => handleDeleteComorbidityChip(chips, index)}
                            fullWidth
                            variant="outlined"
                            placeholder=" Comorbidity (If any)"
                            style={{ marginTop: 10 }}
                        // className={classes.inputs_last}
                        />


                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handlePatientMedicalEditClose} color="secondary">
                        Cancel
                     </Button>
                    <Button onClick={confirm} style={{ color: "#4D5365" }}>
                        Confirm Change
        </Button>
                </DialogActions>
            </Dialog>
        </div >

    );
}

export default EditPatientMedical;
