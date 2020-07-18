import {
    Typography
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import DiagnosisList from "./DiagnosisList";
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import ListItemLink from "./ListItemLink";
import PersonIcon from '@material-ui/icons/Person';
import { Redirect } from "react-router-dom";
import Header from './Header';
const useStyles = makeStyles(theme => ({

    AddDiagnosis: {
        backgroundColor: "#38D4D7",
        position: "relative",
        color: "white",
        left: "50%",
        marginTop: "-2.5%",

        [theme.breakpoints.up('xl')]: {
            left: "80%",

        },
        [theme.breakpoints.between('lg', 'xl')]: {
            left: "83%",

        },

        [theme.breakpoints.between('md', 'lg')]: {
            left: "72%",

        },
        [theme.breakpoints.between('sm', 'md')]: {
            left: "69%",
            marginBottom: "1%",

            fontSize: "9 px"
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            left: "60%",
            fontSize: "7 px",

        },
        [theme.breakpoints.down('xs')]: {
            left: "60%",
            fontSize: "7 px",

        },


    },
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        justifyContent: "left",
        textAlign: "left",
        margin: 0
    }
}));
const columns = [
    { id: "Findings", label: "Findings", minWidth: 100 },
    { id: "Symptoms", label: "Symptoms", minWidth: 170 },
    { id: "Date", label: "Date", minWidth: 100 },

];
function DiagnosisMain(props) {
    const [open, setOpen] = useState(false);

    const classes = useStyles();



    const initial = [

    ];
    const [rows, setRows] = useState(initial);

    const [forceUpdate, setForceUpdate] = useState(0);
    function forceUpdateDiagnosis() {

        var a = forceUpdate;
        setForceUpdate(a + 1);
        alert("Forced Update");


    }
    useEffect(() => {

        var token = localStorage.getItem("token");
        const profile = JSON.parse(localStorage.getItem('profile'));
        const doct_id = profile._id
        async function fetchData() {
            await fetch("http://localhost:8000/api/auth/diagnosis/" + doct_id + "/" + props.patient._id, {
                method: 'GET',
                headers: {
                    'x-access-token': token, "Access-Control-Allow-Origin": "*",
                },

            }).then((response) => response.json()).then((data) => {
                console.log(data)
                setRows(data)

            })
        }
        fetchData();


    }, [forceUpdate]);


    const handleClose = () => {
        setOpen(false);
    };
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

    if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
    else
        return (

            <div className={classes.container}>
                <Header token={localStorage.getItem("token")} />
                <ListItemLink to={{ pathname: "/AddDiagnosis", passed: { patient: JSON.stringify(props.patient) } }} text="Add Diagnosis" icon={<AddIcon />} classes={classes} className={classes.AddDiagnosis} />



                <DiagnosisList
                    rows={rows}
                    columns={columns}
                    forceUpdateDiagnosis={forceUpdateDiagnosis}
                />


            </div >
        );
}
export default withRouter(DiagnosisMain);