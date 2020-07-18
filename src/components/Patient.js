import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, Button } from "@material-ui/core";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DashBoardTable from "./DashBoardTable";
import PatientProfile from "./PatientProfile";
import MedicalInfor from "./PatientMedical";
import DiagnosisMain from "./DiagnosisMain";
import { Link } from "react-router-dom";
import Header from './Header';
import { Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
export default function Patient(props) {
    const classes = useStyles();
    const [patient, setPatient] = useState();


    useEffect(() => {
        const token = localStorage.getItem("token");
        try {


            setPatient(JSON.parse(props.location.passed.Patient))
        } catch (err) {




        }
        console.log(patient)

        // async function fetchData() {

        //     try {


        //         await fetch("http://localhost:8000/api/auth/patient/patient/" + patient_id, {
        //             method: 'GET',
        //             headers: {
        //                 'x-access-token': token, "Access-Control-Allow-Origin": "*",
        //             },

        //         }).then((response) => response.json()).then((data) => {
        //             console.log("Fetching Patient")
        //             console.log(data[0]);
        //             setPatient(data);


        //         })
        //     }
        //     catch (err) {


        //     }
        // }
        // fetchData();

    }, [])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [value, setValue] = React.useState(0);
    if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
    else if (!patient) { return <div className={classes.loader}><Header token={localStorage.getItem("token")} /> <CircularProgress style={{ float: "center", color: "#37ACEB", marginLeft: "48%" }} /><Typography style={{ float: "center", marginTop: 10 }}>Please follow correct workflow<Link to="/PatientsMain">  Patients</Link></Typography></div> }
    else
        return (
            <div className={classes.container}>

                <Header token={localStorage.getItem("token")} />
                <div className={classes.upperTop}>
                    <Typography className={classes.heading}>Manage Patient</Typography>
                    <Button
                        variant="contained"
                        style={{ background: "linear-gradient(to right,  #37ACEB,#38D4D7)", color: "white", fontSize: 11 }}
                        component={Link} to="/PatientsMain"
                    >
                        <ArrowBackIcon />
                    Back
                 </Button>
                </div>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={5}>
                            <Paper className={classes.left_top_paper}>

                                <PatientProfile patient={patient} {...props} />
                            </Paper>
                        </Grid>
                        <Grid item xs={7}>
                            <Paper className={classes.top_paper}>
                                <div className={classes.root}>
                                    <AppBar style={{ background: "linear-gradient(to right,  #37ACEB,#38D4D7)", color: "black" }} position="static">
                                        <AntTabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                            <StyledTab label="Medical Info" {...a11yProps(0)} />
                                            <StyledTab label="DIagnosis" {...a11yProps(1)} />

                                        </AntTabs>
                                    </AppBar>
                                    <TabPanel style={{ color: "black" }} value={value} index={0}>
                                        <MedicalInfor patient={patient} {...props} />
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <DiagnosisMain patient={patient} {...props} />
                                    </TabPanel>

                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </div >
        );
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: 'white',
        width: "100%",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);
const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid blue',
    },
    indicator: {
        backgroundColor: 'orange',

    },
})(Tabs);

const useStyles = makeStyles(theme => ({
    table: {},
    heading: {
        marginTop: 10,
        textAlign: "left",
        fontSize: 15,
        color: theme.palette.text.secondary,
        fontWeight: "bold"
    },
    upperTop: { marginLeft: 2, width: "90%", justifyContent: "left", textAlign: "left" },
    top_paper: {
        margin: 0,
        width: "100%",
        padding: theme.spacing(1.8),
        textAlign: "center",
        color: theme.palette.text.secondary,
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 15,
        border: 1,
        position: 0,
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        overflowx: "auto"

    },
    left_top_paper: {
        margin: 0,
        padding: theme.spacing(1.8),
        textAlign: "center",
        color: theme.palette.text.secondary,
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 15,
        border: 1,
        position: 0,

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
        width: "94%",
        backgroundColor: "#F0F0F0",
        justifyContent: "left",
        textAlign: "left",
        marginBottom: "4rem",
        marginLeft: "6rem",
        marginTop: "5%"
    },
    loader: {
        height: "100%",
        width: "94%",
        backgroundColor: "#F0F0F0",
        justifyContent: "left",
        textAlign: "left",
        marginBottom: "4rem",
        marginLeft: "5%",
        marginTop: "21%",
        display: "block",
        justifyContent: "center"


    }
}));
