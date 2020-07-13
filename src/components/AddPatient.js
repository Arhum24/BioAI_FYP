import React from "react";
import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
  TextField,
  MenuItem,
  Select,
  FormControl
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Banner from "react-js-banner";
import Header from './Header';
import { Redirect } from "react-router-dom";
export default function AddPatient(props) {

  const profile = JSON.parse(localStorage.getItem('profile'));
  const token = localStorage.getItem("token");
  const classes = useStyles();
  const [chips, setChips] = useState([]);
  const [Doctor_ID, setDoctorID] = React.useState(profile._id);
  const [Name, setName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Height, setHeight] = React.useState("");
  const [Weight, setWeight] = React.useState("");
  const [Pulse, setPulse] = React.useState("");
  const [BloodPressure, setBloodPressure] = React.useState("");
  const [BloodGroup, setBloodGroup] = React.useState("");
  const [Gender, setGender] = React.useState("");
  const [MartialStatus, setMartialStatus] = React.useState("");
  const [Allergies, setAllergies] = React.useState([]);
  const [Operation, setOperation] = React.useState([]);
  const [Comorbidity, setComorbidity] = React.useState([]);

  const [Email, setEmail] = React.useState("");
  const [CNIC, setCNIC] = React.useState();
  const [Phone_Number, setPhoneNumber] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [DOB, setDOB] = React.useState(new Date());





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


  const handleAddAllergiesChip = chips_ => {
    let chips_all = Allergies;
    if (chips_ !== "")
      chips_all.push(chips_);

    setAllergies(chips_all)
  };
  const handleAddOperationChip = chips_ => {
    let chips_all = Operation;
    if (chips_ !== "")
      chips_all.push(chips_);

    setOperation(chips_all)
  };
  const handleAddComorbidityChip = chips_ => {
    let chips_all = Comorbidity;
    if (chips_ !== "")
      chips_all.push(chips_);

    setComorbidity(chips_all)
  };

  function InsertAPI() {

    async function postPatient() {

      let result = "";
      try {
        await fetch("https://bioai-node.herokuapp.com/api/auth/patient", {
          method: 'POST',

          body: new URLSearchParams({
            'Doctor_ID': Doctor_ID,
            'Name': Name,
            // 'LastName': LastName,
            'Height': Height,
            'Weight': Weight,
            'Pulse': Pulse,
            'Blood_Pressure': BloodPressure,
            'Blood_Group': BloodGroup,
            'Allergies': Allergies,
            'Operation': Operation,
            'Gender': Gender,
            'Email': Email,
            'CNIC': CNIC,
            'Phone_Number': Phone_Number,
            'Address': Address,
            'DOB': DOB,
            'Comorbidity': Comorbidity,
            'Martial_Staus': MartialStatus

          }),
          headers: {
            'x-access-token': token, "Access-Control-Allow-Origin": "*",
          },

        }).then((response) => response.json()).then((data) => {
          result = data

        })
        return result

      } catch (err) {

        return result = { auth: false }
      }
    }

    return postPatient();

  }
  const handleDeleteAllergiesChip = (chips_, index) => {
    let chips_all = Allergies;
    chips_all = chips_all.filter(x => x !== chips_);
    setAllergies(chips_all);

  };
  const handleDeleteOperationsChip = (chips_, index) => {
    let chips_all = Operation;
    chips_all = chips_all.filter(x => x !== chips_);
    setOperation(chips_all);

  };
  const handleDeleteComorbidityChip = (chips_, index) => {
    let chips_all = Comorbidity;
    chips_all = chips_all.filter(x => x !== chips_);
    setComorbidity(chips_all);

  };
  const handleChange = event => {

    switch (event.target.name) {
      case "name":
        setName(event.target.value); return;
      case "pulse":
        setPulse(event.target.value); return;
      case "blood_pressure":
        setBloodPressure(event.target.value); return;
      case "phone_number":
        setPhoneNumber(event.target.value); return;
      case "weight":
        setWeight(event.target.value); return;
      case "height":
        setHeight(event.target.value); return;
      case "address":
        setAddress(event.target.value); return;
      case "blood_group":
        setBloodGroup(event.target.value); return;
      case "gender":
        setGender(event.target.value); return;
      case "martial_status":
        setMartialStatus(event.target.value); return;
      case "cnic":
        setCNIC(event.target.value); return;
      case "email":
        setEmail(event.target.value); return;

    }


  };
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
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setDOB(date);
  };
  if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
  else
    return (

      <div className={classes.container}>
        <Header token={localStorage.getItem("token")} />
        <div className={classes.upperTop}>
          <Typography className={classes.heading}>Add New Patient</Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: "#5A75D6", color: "white", fontSize: 11 }}
            component={Link} to="/PatientsMain"
          >
            <ArrowBackIcon />
          Back to Patient List
        </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Paper className={classes.top_paper}>
              <Banner
                title="Personal Information"
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
                  <Typography className={classes.labels}>Name:</Typography>
                  <input
                    type="text"
                    name="name"
                    className={classes.inputs}
                    onChange={handleChange}
                  // placeholder="Name"
                  />
                </div>

                <FormControl className={classes.formControl}>
                  <Typography className={classes.labels}>Gender:</Typography>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    // value={"--Gender--"}
                    onChange={handleChange}
                    // placholder="--Gender--"
                    //displayEmpty
                    variant="outlined"
                    name="gender"
                    className={classes.inputs_select}
                  >
                    <MenuItem value="" disabled>
                      --Gender--
                  </MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.holders_outer}>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>CNIC:</Typography>
                  <input
                    type="number"
                    name="cnic"
                    className={classes.inputs}
                    onChange={handleChange}
                  // placeholder="Name"
                  />
                </div>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>Email:</Typography>
                  <input
                    type="email"
                    name="email"
                    className={classes.inputs}
                    onChange={handleChange}
                  // placeholder="Name"
                  />
                </div>


              </div>
              <div className={classes.holders_outer}>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>Date Of Birth:</Typography>
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
                          name="dob"
                          format="dd/MM/yyyy"
                          value={DOB}
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
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>
                    Phone Number:
                </Typography>
                  <input
                    type="number"
                    name="phone_number"
                    className={classes.inputs_select2}
                    onChange={handleChange}
                  // placeholder="Address"
                  />
                </div>
              </div>
              <div className={classes.holders_outer}>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>
                    Martial Status:
                </Typography>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    // value={"--Gender--"}
                    onChange={handleChange}
                    // placholder="--Gender--"
                    //displayEmpty
                    name="martial_status"
                    variant="outlined"
                    className={classes.inputs_select2}
                  >
                    <MenuItem value="" disabled>
                      --Martial Status--
                  </MenuItem>
                    <MenuItem value={"Single"}>Single</MenuItem>
                    <MenuItem value={"Married"}>Married</MenuItem>
                    <MenuItem value={"Divorced"}>Divorced</MenuItem>
                  </Select>
                </div>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>Address:</Typography>
                  <TextField
                    id="outlined-multiline-static"
                    // label="Multiline"
                    multiline
                    name="address"
                    rows="1"
                    defaultValue=""
                    variant="outlined"
                    className={classes.inputs_long}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Banner
                title="Medical Information"
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
                  <Typography className={classes.labels}>Height (cm):</Typography>
                  <input
                    type="number"
                    name="height"
                    className={classes.inputs}
                    onChange={handleChange}
                  // placeholder="Age"
                  />
                </div>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>Weight (Kg):</Typography>
                  <input
                    type="number"
                    name="weight"
                    className={classes.inputs}
                    onChange={handleChange}
                  // placeholder="Address"
                  />
                </div>
              </div>
              <div className={classes.holders_outer}>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>Blood Group:</Typography>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    // value={"--Gender--"}
                    onChange={handleChange}
                    placholder="--Blood Group--"
                    name="blood_group"
                    //displayEmpty
                    variant="outlined"
                    className={classes.inputs_select}
                  >
                    <MenuItem value={""} disabled>
                      --Blood Group--
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
                </div>
                <div className={classes.holders_inner}>
                  <Typography className={classes.labels}>
                    Blood Pressure (Nomral):
                </Typography>
                  <input
                    type="number"
                    name="blood_pressure"
                    className={classes.inputs}
                    onChange={handleChange}
                  // placeholder="Address"
                  />
                </div>
              </div>
              <div className={classes.holders_outer_last}>
                <div className={classes.holders_inner_last}>
                  <Typography className={classes.labels}>
                    Pulse (Nomral):
                </Typography>
                  <input
                    type="number"
                    name="pulse"
                    className={classes.inputs_last}
                    onChange={handleChange}
                  // placeholder="Address"
                  />
                </div>


              </div>

              <div className={classes.holders_outer_last}>
                <div className={classes.holders_inner_last}>
                  <Typography className={classes.labels}>
                    Allergies (If any):
                </Typography>
                  <StyledChipInput
                    value={Allergies}
                    onAdd={chips => handleAddAllergiesChip(chips)}
                    onDelete={(chips, index) => handleDeleteAllergiesChip(chips, index)}
                    fullWidth
                    variant="outlined"
                  // className={classes.inputs_last}
                  />
                </div>
                <div className={classes.holders_inner_last}>
                  <Typography className={classes.labels}>
                    Previous Operation(If any):
                </Typography>
                  <StyledChipInput
                    value={Operation}
                    onAdd={chips => handleAddOperationChip(chips)}
                    onDelete={(chips, index) => handleDeleteOperationsChip(chips, index)}
                    fullWidth
                    variant="outlined"
                  // className={classes.inputs_last}
                  />
                </div>

                <div className={classes.holders_inner_last}>
                  <Typography className={classes.labels}>
                    Comorbidity (If any):
                </Typography>
                  <StyledChipInput
                    value={Comorbidity}
                    onAdd={chips => handleAddComorbidityChip(chips)}
                    onDelete={(chips, index) => handleDeleteComorbidityChip(chips, index)}
                    fullWidth
                    variant="outlined"
                  // className={classes.inputs_last}
                  />
                </div>

              </div>

            </Paper>
            <div style={{ marginTop: "1em", marginRight: "-3em", float: "right" }}>

              <div className={classes.holders_inner}>
                <div style={{}}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#5A75D6", color: "white", fontSize: 13, marginRight: "1.5em" }}
                    component={Link} to="/PatientsMain"
                  >

                    Cancel
 </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#4D5365", color: "white", fontSize: 13 }}
                    onClick={(e) => {
                      e.preventDefault();
                      let result = InsertAPI();
                      result.then((data) => {

                        if (data.auth === true) {
                          alert("Data " + data)
                        }
                        else { console.log(data) }
                      })



                    }}
                  >
                    Confirm
 </Button>
                </div>
              </div>
            </div>
          </Grid>
          {console.log(props)}
        </Grid>

      </div >
    );
}

const useStyles = makeStyles(theme => ({
  holders_outer: { display: "inline-flex", margin: 0, marginTop: 15 },
  holders_outer_last: { display: "inline-flex", margin: 0, marginTop: 15, width: "99%" },
  upperTop: { marginLeft: 50, width: "90%" },
  formControl: {
    margin: theme.spacing(2.2),
    minWidth: 160,
    height: 50
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  holders_inner: { display: "block", margin: 10, justifyContent: "left" },
  holders_inner_last: { display: "block", margin: 10, justifyContent: "left", width: "9900%" },
  labels: { fontWeight: "bold", marginBottom: 15, fontSize: 13, textAlign: "left", color: "#5A75D6" },
  inputs: {
    width: 800, margin: 0, height: 40,
    [theme.breakpoints.down('lg')]: {
      width: "35.2rem"
    },
    [theme.breakpoints.down('md')]: {
      width: "25rem"
    },
    [theme.breakpoints.down('sm')]: {
      width: "11rem"
    },
  },
  inputs_last: {
    width: "100%", margin: 0, height: 40,
    [theme.breakpoints.down('lg')]: {
      width: "100%"
    },
    [theme.breakpoints.down('md')]: {
      width: "100%"
    },
    [theme.breakpoints.down('sm')]: {
      width: "100%"
    },
  },
  inputs_long: {
    width: 800, marginLeft: 0, height: 40, [theme.breakpoints.down('lg')]: {
      width: "35.2rem"
    },
    [theme.breakpoints.down('md')]: {
      width: "25rem"
    }, [theme.breakpoints.down('sm')]: {
      width: "11rem"
    },
  },
  inputs_select: {
    width: 800, margin: 0, marginTop: -4, height: 40, [theme.breakpoints.down('lg')]: {
      width: "35.2rem"
    },
    [theme.breakpoints.down('md')]: {
      width: "25rem"
    }, [theme.breakpoints.down('sm')]: {
      width: "11rem"
    },
  },
  inputs_select2: {
    width: 810, margin: 0, height: 60, [theme.breakpoints.down('lg')]: {
      width: "35.2rem"
    },
    [theme.breakpoints.down('md')]: {
      width: "25rem"
    }, [theme.breakpoints.down('sm')]: {
      width: "11rem"
    },
  },
  heading: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 15,
    marginBottom: 5,
    color: "#5A75D6",
    textAlign: "left"

  },
  top_paper: {
    marginTop: 10,
    marginLeft: 50,
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    flexDirection: "row",
    fontSize: 5,
    border: 1,
    width: "99%",
    height: "97%"
  },
  mid_paper: {
    padding: theme.spacing(4),
    textAlign: "center",
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
