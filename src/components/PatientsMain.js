import {
    Typography
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import PatientList from "./PatientList";
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import ListItemLink from "./ListItemLink";
import Header from './Header';
import { Redirect } from "react-router-dom";
const useStyles = makeStyles(theme => ({

    AddPatient: {
        backgroundColor: "#38D4D7",
        position: "relative",
        color: "white",
        left: "88%",
        right: "10.5%",
        marginTop: 45,
        marginBottom: "-2rem",

        [theme.breakpoints.up('xl')]: {
            left: "89.4%",

        },
        [theme.breakpoints.between('lg', 'xl')]: {
            left: "89.4%",

        },

        [theme.breakpoints.between('md', 'lg')]: {
            left: "87.8%",

        },
        [theme.breakpoints.between('sm', 'md')]: {
            left: "85.5%",

            fontSize: "9 px"
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            left: "78%",
            fontSize: "7 px",

        },
        [theme.breakpoints.down('xs')]: {
            left: "67%",
            fontSize: "7 px",

        },


    },
    container: {
        height: "100%",
        width: "94%",
        backgroundColor: "#F0F0F0",
        justifyContent: "left",
        textAlign: "left",
        marginBottom: "4rem",
        marginLeft: "4.7rem",
        marginTop: "2%"
    }
}));
const columns = [
    { id: "PatientName", label: "Patient Name", minWidth: 100 },
    { id: "PatientCNIC", label: "CNIC", minWidth: 100 },
    { id: "PatientPhone", label: "Phone Number", minWidth: 170 },
    { id: "PatientDOB", label: "Date of Birth", minWidth: 100 },


];
function PatientsMain(props) {
    const [open, setOpen] = useState(false);
    const [forceupdate, setForceUpdate] = useState(0);
    const [word, setWord] = useState("");
    const [data, setData] = useState([])
    const classes = useStyles();



    const initial = [
        // { PatientGender: "Male", PatientName: "Umair Awan", PatientPhone: +9230773141632, PatientEmail: "umairawan706@gmail.com" },
        // { PatientGender: "Other", PatientName: "Malik Ahmad", PatientPhone: +9230773141632, PatientEmail: "ahmadawan706@gmail.com" },
        // { PatientGender: "Female", PatientName: "Alia Zahoor", PatientPhone: +9230773141632, PatientEmail: "alia706@gmail.com" }
    ];
    const [rows, setRows] = useState(initial);
    const forceUpdateFunction = function () {

        var a = forceupdate + 1;
        setForceUpdate(a);

    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        const profile = JSON.parse(localStorage.getItem('profile'));
        const doct_id = profile._id

        async function fetchData() {
            await fetch("http://localhost:8000/api/auth/patient/" + doct_id, {
                method: 'GET',
                headers: {
                    'x-access-token': token, "Access-Control-Allow-Origin": "*",
                },

            }).then((response) => response.json()).then((data) => {
                console.log(data)
                setRows(data);
                setData(data);

            })
        }
        fetchData();

    }, [forceupdate])

    const handleClose = () => {
        setOpen(false);
    };


    const handleFilter = (e) => {

        setWord(e.target.value);
        let newList = []
        if (word !== "") {

            newList = data.filter(item =>
                item.Name.toLowerCase().trim().includes(word.toLowerCase().trim()))
            console.log("Filtered ", newList)
            setRows(newList)

        } else {

            setRows(data);
        }


    }


    const handleConfirm = async (patient) => {
        if (patient.name !== "") {
            const data = { PatientName: patient.PatientName }
            let result = "";
            await fetch("/patient", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((response) => response.json()).then((data) => {
                result = data
            })
            console.log(result)
            handleClose();
            window.location.reload();
        } else {
            alert("Please Enter Some Value")

        }
    };

    if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false) { return <Redirect to='/Autherization' /> }
    else
        return (

            <div className={classes.container}>
                <Header token={localStorage.getItem("token")} />
                {/* 
            <Button
                variant="contained"
                className={classes.AddPatient
                }
                component={Link} to="/AddPatient"

                startIcon={< AddIcon />}

            >
                Add Patient
          </Button> */}
                {/* `/ideas/${ this.props.testValue }` */}
                <ListItemLink to={{ pathname: "/AddPatient", passed: { name: "Umair Awan" } }} variant="contained" text="Add Patient" icon={<AddIcon />} classes={classes} className={classes.AddPatient} doctor="Umair Doctor" />
                <Typography style={{ marginLeft: "3.5rem", textAlign: "left", fontWeight: "bold", color: "gray", fontSize: 15 }}>Patients</Typography>
                <input style={{ marginRight: "3.5rem", marginBottom: "1%", float: "right", width: 400, height: 40, borderRadius: 6, borderWidth: 0.5, borderColor: "white", marginTop: "2%" }} value={word} onChange={handleFilter} name="Search Bar" placeholder="Search by name...." />
                <PatientList
                    rows={rows}
                    columns={columns}
                    forceUpdate={forceUpdateFunction}
                />


            </div >
        );
}
export default withRouter(PatientsMain);