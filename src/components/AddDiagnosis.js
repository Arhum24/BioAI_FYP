import React from "react";
import { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChipInput from "material-ui-chip-input";
import { Link } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import {
    Typography,
    Button,

} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Banner from "react-js-banner";
import Header from './Header';
import { Redirect } from "react-router-dom"; import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";
import { Message } from 'shineout'
export default function AddDiagnosis(props) {
    const classes = useStyles();
    const [chips, setChips] = useState([]);
    const numbers = ['1', '2', '3', '4', '5'];
    const [patient, setPatient] = React.useState("")
    const [DiseaseName, setDiseaseName] = React.useState("");
    const [Tests, setTests] = React.useState([]);
    const [Medicines, setMedicines] = React.useState([]);
    const [Symptoms, setSymptoms] = React.useState([]);
    const [Findings, setFindings] = React.useState([]);
    const [Recommended_Foods, setRecommendFoods] = React.useState([]);
    const [Preventive_Foods, setPreventiveFoods] = React.useState([]);
    const [Diet_Note, setDietNote] = React.useState("");
    const [Comments, setComments] = React.useState("");
    const [Date, setDate] = React.useState(moment());
    const [Medicines_Notes, setMedicineNotes] = React.useState("");
    const [failure, setFailure] = React.useState(false);
    const [failureMessage, setFailureMessage] = React.useState("")

    const [success, setSuccess] = React.useState(false);

    const goBack = () => {
        props.history.push('/PatientsMain');
    }
    const materialTheme = createMuiTheme({
        overrides: {
            MuiIconButton: { root: { color: "#5A75D6" }, input: { color: "#5A75D6" } },
            MuiInputBase: { input: { color: "black" } },
            MuiPickersToolbar: {
                toolbar: {
                    backgroundColor: "#5A75D6",
                },
            },
            MuiPickersCalendarHeader: {
                switchHeader: {
                    // backgroundColor: lightBlue.A200,
                    // color: "white",
                },
            },
            MuiPickersDay: {


                MuiPickersModal: {
                    dialogAction: {
                        color: "#5A75D6",
                    },
                },
            },
        }
    });
    React.useEffect(() => {

        if (props.location.passed) {
            setPatient(JSON.parse(props.location.passed.patient));
        }





    }, [])
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

    const handleAddChip = chips_ => {
        let chips_all = chips;
        chips_all.push(chips_);

        setChips(chips_all)
    };


    function handleConfirm() {

        async function postPatient() {
            var token = localStorage.getItem("token");
            const profile = JSON.parse(localStorage.getItem('profile'));
            const doct_id = profile._id
            let result = "";
            try {
                await fetch("https://bioai-node.herokuapp.com/api/auth/diagnosis", {
                    method: 'POST',

                    body: JSON.stringify({
                        Doctor_ID: doct_id,
                        Patient_ID: patient._id,
                        DiseaseName: DiseaseName,
                        // 'LastName': LastName,
                        Tests: Tests,
                        Medicines: Medicines,
                        Medicine_Notes: Medicines_Notes,
                        Symptoms: Symptoms,
                        Findings: Findings,
                        Recommended_Foods: Recommended_Foods,
                        Preventive_Foods: Preventive_Foods,
                        Diet_Note: Diet_Note,
                        // 'Email': Email,
                        Comments: Comments,
                        Date: Date,

                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                        "Access-Control-Allow-Origin": "*",
                    },

                }).then((response) => response.json()).then((data) => {
                    result = data
                    console.log(data)
                    if (!data.error) {
                        // handleSnackClick();
                        setSuccess(true);

                    }
                    else {

                        setFailure(true);
                        setFailureMessage("Please Enter Correct Details");
                    }

                })
                return result

            } catch (err) {

                return result = { auth: false }
            }
        }

        if (Symptoms.length < 1 || Findings < 1) {

            setFailureMessage("Please Enter Required Fields");
            setFailure(true);

        } else {

            postPatient();


        }

    }
    const handleDeleteSymptomsChip = (chips_, index) => {
        let chips_all = Symptoms;
        chips_all = chips_all.filter(x => x !== chips_);
        setSymptoms(chips_all);

    };
    const handleDeleteMedicinesChip = (chips_, index) => {
        let chips_all = Medicines;
        chips_all = chips_all.filter(x => x !== chips_);
        setMedicines(chips_all);

    };
    const handleDeleteTestsChip = (chips_, index) => {
        let chips_all = Tests;
        chips_all = chips_all.filter(x => x !== chips_);
        setTests(chips_all);

    }; const handleDeleteRecommendedFoodsChip = (chips_, index) => {
        let chips_all = Recommended_Foods;
        chips_all = chips_all.filter(x => x !== chips_);
        setRecommendFoods(chips_all);

    };
    const handleDeletePreventiveFoodsChip = (chips_, index) => {
        let chips_all = Preventive_Foods;
        chips_all = chips_all.filter(x => x !== chips_);
        setPreventiveFoods(chips_all);

    };
    const handleAddPreventivesChip = chips_ => {
        let chips_all = Preventive_Foods;
        if (chips_ !== "")
            chips_all.push(chips_);

        setPreventiveFoods(chips_all)
    };
    const handleAddRecommendedChip = chips_ => {
        let chips_all = Recommended_Foods;
        if (chips_ !== "")
            chips_all.push(chips_);

        setRecommendFoods(chips_all)
    };
    const handleAddTestsChip = chips_ => {
        let chips_all = Tests;
        if (chips_ !== "")
            chips_all.push(chips_);

        setTests(chips_all)
    };
    const handleAddMedicinesChip = chips_ => {
        let chips_all = Medicines;
        if (chips_ !== "")
            chips_all.push(chips_);

        setMedicines(chips_all)
    };
    const handleAddSymptomsChip = chips_ => {
        let chips_all = Symptoms;
        if (chips_ !== "")
            chips_all.push(chips_);

        setSymptoms(chips_all)
    };


    const [openSnack, setOpenSnack] = React.useState(false);
    const handleDeleteChip = (chips_, index) => {
        let chips_all = chips;
        chips_all = chips_all.filter(x => x !== chips_);
        setChips(chips_all);
        console.log("RUnDel")
    };
    const handleChange = event => {
        setSuccess(false);
        setFailure(false);
        switch (event.target.name) {
            case 'DiseaseName':
                setDiseaseName(event.target.value); return;
            case 'Medicines_Notes':
                setMedicineNotes(event.target.value); return;
            case 'Findings':
                setFindings(event.target.value); return;
            case 'Diet_Note':
                setDietNote(event.target.value); return;
            case 'Comments':
                setComments(event.target.value); return;
            default:
                throw new Error();
        }
        // setPatientName(event.target.value);
    }
    const handleSnackClick = () => {
        setOpenSnack(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };
    const handleDateChange = (date) => {
        setDate(date);
    };
    if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
    else if (!props.location.passed) { return <Redirect to='/PatientsMain' /> }
    else
        return (

            < div className={classes.container} >

                <Header token={localStorage.getItem("token")} />
                <div className={classes.upperTop}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={openSnack}
                        autoHideDuration={6000}
                        onClose={handleSnackClose}
                        message="Diagnosis Added Successfully"
                        action={
                            <React.Fragment>

                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                    <Typography className={classes.heading}>Conduct New Diagnosis</Typography>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#5A75D6", color: "white", fontSize: 11 }}
                        component={Link} to="/PatientsMain"
                    >
                        <ArrowBackIcon />
          Back to Patient List
        </Button>
                </div>
                {success ? Message.success(<div style={{ width: 240 }}>Diagnosis Added Successfully</div>, 8, {
                    position: "bottom-right",
                    title: 'Sucessfully Added',
                    onClose: () => { setSuccess(false) }
                }) : failure && Message.warn(<div style={{ width: 240 }}>{failureMessage}</div>, 0, {
                    position: "bottom-right",
                    title: 'Error',
                    onClose: () => { setFailure(false); setFailureMessage("") }
                })}
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <Paper className={classes.top_paper}>
                            <Banner
                                title="Diagnosis"
                                css={{
                                    textAlign: "left",
                                    alignSelf: "stretch",
                                    backgroundColor: "#5A75D6",
                                    color: "white",
                                    justifyContent: "left",
                                    width: "100%"
                                }}
                            />

                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Symptoms:
                </Typography>

                                    <StyledChipInput
                                        value={Symptoms}
                                        onAdd={chips => handleAddSymptomsChip(chips)}
                                        onDelete={(chips, index) => handleDeleteSymptomsChip(chips, index)}
                                        fullWidth
                                        color="primary"
                                        variant="outlined"

                                        placeholder='Type and press enter to add input'

                                    // className={classes.inputs}
                                    />
                                </div>
                                <p style={{ fontSize: 10, textAlign: "left", marginLeft: 8, marginTop: 2, fontWeight: 'bold', color: "gray" }}>*Required</p>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Clinical Findings:
                </Typography>
                                    <input
                                        type="text"
                                        name="Findings"
                                        className={classes.inputs_select}
                                        onChange={handleChange}
                                        style={{ fontSize: 15 }}
                                    // placeholder="Address"
                                    />
                                    <p style={{ fontSize: 10, textAlign: "left", marginTop: 2, fontWeight: 'bold', color: "gray" }}>*Required</p>
                                </div>

                            </div>

                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Recommended Tests:
                </Typography>
                                    <StyledChipInput
                                        value={Tests}
                                        onAdd={chips => handleAddTestsChip(chips)}
                                        onDelete={(chips, index) => handleDeleteTestsChip(chips, index)}
                                        fullWidth
                                        variant="outlined"
                                        placeholder='Type and press enter to add input'
                                    />
                                </div>

                            </div>
                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>Date Of Diagnosis:</Typography>
                                    {/* <input
                  type="number"
                  name="age"
                  className={classes.inputs}
                // placeholder="Age"
                /> */}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <ThemeProvider theme={materialTheme}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label=""
                                                    format="MM/dd/yyyy"
                                                    value={Date}
                                                    inputVariant="outlined"
                                                    className={classes.inputs}
                                                    onChange={handleDateChange}

                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </ThemeProvider>
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </div>

                            </div>

                            <Banner
                                title="Prescription"
                                css={{
                                    textAlign: "left",
                                    alignSelf: "stretch",
                                    backgroundColor: "#5A75D6",
                                    color: "white",
                                    justifyContent: "left",
                                    width: "100%",
                                    marginTop: 39
                                }}
                            />
                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Prescribed Drugs:
                </Typography>
                                    <StyledChipInput
                                        value={Medicines}
                                        onAdd={chips => handleAddMedicinesChip(chips)}
                                        onDelete={(chips, index) => handleDeleteMedicinesChip(chips, index)}
                                        fullWidth
                                        variant="outlined"
                                        placeholder='Type and press enter to add input'
                                    // className={classes.inputs}
                                    />
                                </div>

                            </div>
                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Medication Instruction:
                </Typography>
                                    <input
                                        type="text"
                                        name="Medicines_Notes"
                                        className={classes.inputs}
                                        onChange={handleChange}
                                        style={{ fontSize: 15 }}
                                    // placeholder="Address"
                                    />
                                </div>

                            </div>

                            <Banner
                                title="Diet Plan"
                                css={{
                                    textAlign: "left",
                                    alignSelf: "stretch",
                                    backgroundColor: "#5A75D6",
                                    color: "white",
                                    justifyContent: "left",
                                    width: "100%",
                                    marginTop: 39
                                }}
                            />
                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Recommended Food:
                </Typography>
                                    <StyledChipInput
                                        value={Recommended_Foods}
                                        onAdd={chips => handleAddRecommendedChip(chips)}
                                        onDelete={(chips, index) => handleDeleteRecommendedFoodsChip(chips, index)}
                                        fullWidth
                                        variant="outlined"
                                        placeholder='Type and press enter to add input'
                                    // className={classes.inputs}
                                    />
                                </div>

                            </div>
                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Preventive Food:
                                 </Typography>
                                    <StyledChipInput
                                        value={Preventive_Foods}
                                        onAdd={chips => handleAddPreventivesChip(chips)}
                                        onDelete={(chips, index) => handleDeletePreventiveFoodsChip(chips, index)}
                                        fullWidth
                                        variant="outlined"
                                        style={{ chip: { backgroundColor: "red" } }}
                                        placeholder='Type and press enter to add input'
                                    // className={classes.inputs}
                                    />
                                </div>

                            </div>
                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Diet Plan Instructions:
                                </Typography>
                                    <input
                                        type="text"
                                        name="Diet_Note"
                                        className={classes.inputs}
                                        onChange={handleChange}
                                        style={{ fontSize: 15 }}
                                    // placeholder="Address"
                                    />
                                </div>

                            </div>
                            <Banner
                                title="Doctors Comments"
                                css={{
                                    textAlign: "left",
                                    alignSelf: "stretch",
                                    backgroundColor: "#5A75D6",
                                    color: "white",
                                    justifyContent: "left",
                                    width: "100%",
                                    marginTop: 39
                                }}
                            />
                            <div className={classes.holders_outer}>
                                <div className={classes.holders_inner}>
                                    <Typography className={classes.labels}>
                                        Doctor's Comments:
                </Typography>
                                    <input
                                        type="text"
                                        name="Comments"
                                        className={classes.inputs}
                                        onChange={handleChange}
                                        style={{ fontSize: 15 }}
                                    // placeholder="Address"
                                    />
                                </div>

                            </div>

                            <div style={{ marginTop: "10em", float: "right" }}>

                                <div className={classes.holders_inner}>
                                    <div style={{}}>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: "#5A75D6", color: "white", fontSize: 13, marginRight: "1.5em" }}
                                            component={Link} to="/PatientsMain"
                                            onClick={goBack}
                                        >

                                            Cancel
               </Button>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: "#4D5365", color: "white", fontSize: 13 }}
                                            onClick={
                                                handleConfirm
                                            }
                                        >
                                            Confirm
               </Button>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </div >
        );
}

const useStyles = makeStyles(theme => ({
    holders_outer: { display: "block", margin: 0, marginTop: 15 },
    upperTop: { marginLeft: 50, width: "90%" },
    formControl: {
        margin: theme.spacing(2.2),
        minWidth: 160,
        height: 50
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    holders_inner: { display: "block", justifyContent: "left", margin: 10 },
    holders_inner_left: { display: "block", margin: 10, marginLeft: "0%" },

    labels: { textAlign: "left", fontSize: "20", fontWeight: "bold", marginBottom: 15, fontSize: 13, color: "#5A75D6" },
    inputs: {
        width: "100%", margin: 0, height: 80, color: "#5A75D6"

    },
    inputs_long: {
        width: "100%", margin: 0, height: 80,
    },
    inputs_select: {
        width: "100%", margin: 0, height: 40,
    },
    inputs_select2: {
        width: "100%", margin: 0, height: 80,
    },
    heading: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 15,
        marginBottom: 5,
        color: "gray",
        textAlign: "left",
        color: "#5A75D6"

    },
    top_paper: {
        marginTop: 10,
        marginLeft: 50,
        padding: theme.spacing(4),
        color: theme.palette.text.secondary,
        flexDirection: "row",
        fontSize: 5,
        border: 1,
        width: "99%"
    },
    mid_paper: {
        padding: theme.spacing(4),
        textAlign: "left",
        color: theme.palette.text.secondary,
        height: 450,
        border: 1
    },
    end_paper: {
        padding: theme.spacing(4),
        textAlign: "left",
        color: theme.palette.text.secondary,
        marginTop: 10,
        border: 1
    },
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#F0F0F0",
        justifyContent: "left",
        textAlign: "left",
        marginBottom: "4rem",
        marginLeft: "4.7rem",
        marginTop: "4%"
    }
}));
