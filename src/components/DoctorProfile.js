
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField

} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import ListItemLink from "./ListItemLink";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import BlockIcon from '@material-ui/icons/Block';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DetailsIcon from '@material-ui/icons/Details';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Header from './Header';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { Label } from "@material-ui/icons";
import { Message } from 'shineout'

const useStyles = makeStyles(theme => ({
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
    },
    root: {
        width: "100%",
    },
    root2: {
        flexGrow: 1,
        margin: 80, marginLeft: "6%",
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#5A75D6"
    },
    appBar2: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    container: {
        maxHeight: 750,
        marginTop: 50,
        marginLeft: 50,
        marginRight: 400,
        width: "95%",
    },
    column: {

        display: "flex",
        fontSize: "50"
    },
    DetailsButton: { borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableRow = withStyles((theme) => ({

    root: {
        height: 5,
        '&:nth-of-type(odd)': {
            backgroundColor: "white",
            borderLeft: "1rem",

        },
        '&:nth-of-type(even)': {
            backgroundColor: "white",

            borderLeft: "1rem",

        },


        '&:nth-child(2)': {
            textAlign: "center"

        },

        '&:nth-child(3)': {
            textAlign: "center"

        },
        '&:nth-child(1)': {
            textAlign: "center",
            width: "93px"

        },
        '&:nth-child(4)': {
            textAlign: "center"

        },
        "&:hover": {

            backgroundColor: "none"
        },
    },

}))(TableRow);
const StyledTableCell = withStyles((theme) => ({

    head: {
        height: 5,
        backgroundColor: "black",

        color: theme.palette.common.white,
        '&:nth-child(2)': {
            textAlign: "center"
        }
        ,
        '&:nth-child(1)': {
            textAlign: "center",
            width: "93px"
        }
        ,

        '&:nth-child(3)': {
            textAlign: "center"
        }
        ,
        '&:nth-child(5)': {
            textAlign: "center"
        }
        ,
        '&:nth-child(4)': {
            textAlign: "center",

        }
    },
    body: {

        fontSize: 14,
        '&:nth-of-type(odd)': {

            color: "black"
        },
        '&:nth-of-type(even)': {

            color: "black"
        },
        '&:nth-child(2)': {
            textAlign: "center"

        },
        '&:nth-child(1)': {
            textAlign: "center", width: "93px"

        },
        '&:nth-child(3)': {
            textAlign: "center"
        }
        ,
        '&:nth-child(4)': {
            textAlign: "center"
        }
        ,
        '&:nth-child(5)': {
            textAlign: "center"
        }
    },
    root: {},
}))(TableCell);
const columns = [
    { id: "DoctorName", label: "Doctor Name", minWidth: 100 },
    { id: "CNIC", label: "CNIC", minWidth: 170 },
    { id: "Licence", label: "Licence", minWidth: 100 },
    { id: "Licence Country", label: "Licence Country", minWidth: 100 },
    { id: "Licence Verified", label: "Licence Verified", minWidth: 100 },
    { id: "Active", label: "Active", minWidth: 100 },

];
export default function DoctorProfile(props) {
    const classes = useStyles();
    const [profile, setProfile] = React.useState(JSON.parse(localStorage.getItem("profile")));
    const [name, setName] = React.useState(JSON.parse(localStorage.getItem("profile")).name);
    const [email, setEmail] = React.useState(JSON.parse(localStorage.getItem("profile")).email);
    const [phone_number, setPhoneNumber] = React.useState(JSON.parse(localStorage.getItem("profile")).phone_number);
    const [licence, setLicence] = React.useState(JSON.parse(localStorage.getItem("profile")).licence);
    const [cnic, setCNIC] = React.useState(JSON.parse(localStorage.getItem("profile")).cnic);
    const [licence_country, setLicenceCountry] = React.useState(JSON.parse(localStorage.getItem("profile")).licence_country);
    const [qualification, setQualification] = React.useState(JSON.parse(localStorage.getItem("profile")).qualification);
    const [password, setPassword] = React.useState(JSON.parse(localStorage.getItem("profile")).password);
    const [hospital, setHospital] = React.useState(JSON.parse(localStorage.getItem("profile")).hospital);
    const token = localStorage.getItem("token");

    const [success, setSuccess] = React.useState(false);
    const [failure, setFailure] = React.useState(false);
    const [failureMessage, setFailureMessage] = React.useState("");
    const handleChange = (event) => {
        setFailure(false);
        setSuccess(false);
        switch (event.target.name) {
            case "name":
                setName(event.target.value); return;
            case "cnic":
                setCNIC(event.target.value); return;
            case "email":
                setEmail(event.target.value); return;
            case "phone_number":
                setPhoneNumber(event.target.value); return;
            case "licence":
                setLicence(event.target.value); return;
            case "licence_country":
                setLicenceCountry(event.target.value); return;
            case "qualification":
                setQualification(event.target.value); return;
            case "password":
                setPassword(event.target.value); return;
            case "hospital":
                setHospital(event.target.value); return;

        }



    }

    const UpdateInfo = async () => {



        let result = "";
        try {
            await fetch("http://localhost:8000/api/auth/user/" + profile._id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    "Access-Control-Allow-Origin": "*",
                },

                body: JSON.stringify({
                    'email': email,
                    // 'password': password,
                    'cnic': cnic,
                    'licence': licence,
                    'licence_country': licence_country,
                    'name': name,
                    'qualification': qualification,
                    'phone_number': phone_number,
                    'hospital': hospital,


                }),
            }).then((response) => response.json()).then(async (data) => {
                result = data;

                if (!data.error) {

                    async function fetchData() {

                        const token = localStorage.getItem("token");
                        await fetch("http://localhost:8000/api/auth/userdata", {
                            method: 'GET',
                            headers: {
                                'x-access-token': token, "Access-Control-Allow-Origin": "*",
                            },

                        }).then((response) => response.json()).then(async (data) => {

                            await localStorage.setItem("profile", JSON.stringify(data))
                            // props.history.push("/Dashboard")

                        })
                    }

                    fetchData();

                    setSuccess(true);
                }
                else {

                    setFailureMessage("Error while updating. Please Make sure that you entered correct details");
                    setFailure(true);

                }

            })
        } catch (err) {

            return result = { auth: false }
        }

        return result


    }




    return (
        <div className={classes.root2}>
            <Header token={localStorage.getItem("token")} />

            <Grid container spacing={3}>
                <Grid item xs={12}>

                    {success ? Message.success(<div style={{ width: 240 }}>Profile Updated Successfully</div>, 8, {
                        position: "bottom-right",
                        title: 'Sucessfully Updated',
                    }) : failure && Message.warn(<div style={{ width: 240 }}>{failureMessage}</div>, 0, {
                        position: "bottom-right",
                        title: 'Error',
                    })}
                    <Paper className={classes.paper}> <div style={{ background: "linear-gradient(to right, #38D4D7, #37ACEB)", height: "25.1rem", justifyContent: "center", padding: 0, margin: 0 }}></div>
                        <div style={{ textAlign: "center", justifyContent: "center", position: "relative", zIndex: 1, top: "50%", margin: "-15rem 0 0 -0rem" }}>
                            <div style={{ marginLeft: "auto", marginRight: "auto", display: "Block", width: "20rem" }}>
                                <Avatar style={{
                                    marginTop: "-4%", width: "90px", height: "90px", marginLeft: "auto", marginRight: "auto",
                                }} alt="" src={require('../static/images/avatar/male_avatar.png')} /></div>
                            <div style={{ marginLeft: "auto", marginRight: "auto", display: "Block", width: "20rem" }}>
                                <Typography style={{ marginTop: "7px", marginLeft: "auto", marginRight: "auto", width: 180, color: "white" }}>Dr. {profile.name}</Typography>

                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper} style={{ marginTop: "0.1em", backgroundColor: "white" }}>

                        <table style={{ width: "100%", border: "1px solid #38D4D7" }}>
                            <tbody style={{ padding: "20" }}>
                                <tr style={{
                                    lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "white", border: "1px solid white", background: "linear-gradient(to right, #38D4D7, #37ACEB)"
                                }}>
                                    <th colspan="2">Personal Information </th>
                                </tr>
                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Name: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        name="name"
                                        rows="1"
                                        defaultValue={name}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                    /></td>
                                </tr>

                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Email: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        name="email"
                                        rows="1"
                                        defaultValue={email}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                    /> </td>
                                </tr>

                                {/* <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "black", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Password: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        name="password"
                                        rows="1"
                                        defaultValue={password}
                                        variant="outlined"
                                        fullWidth
                                        onfocus="this.value=''"

                                        type="password"
                                        onChange={handleChange}
                                    /> </td>
                                </tr> */}
                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Phone Number: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        type="number"
                                        name="phone_number"
                                        rows="1"
                                        defaultValue={phone_number}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                    /> </td>
                                </tr>
                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >CNIC: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        type="number"
                                        name="cnic"
                                        rows="1"
                                        defaultValue={cnic}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                    /> </td>
                                </tr>
                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Licence Country: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        name="licence_country"
                                        rows="1"
                                        defaultValue={licence_country}
                                        variant="outlined"
                                        type="text"
                                        fullWidth
                                        onChange={handleChange}
                                    /></td>
                                </tr>
                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Licence: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        name="licence"
                                        rows="1"
                                        defaultValue={licence}
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                        onChange={handleChange}
                                    /></td>
                                </tr>
                                {/* <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "black", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Licence Country: </td>
                                    <td>{profile.licence_country} </td>
                                </tr> */}
                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Qualification: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        name="qualification"
                                        rows="1"
                                        defaultValue={qualification}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                    /></td>
                                </tr>
                                <tr style={{ lineHeight: "80px", fontWeight: "bold", fontSize: "1.4rem", color: "gray", border: "1px solid white", backgroundColor: "white" }}>
                                    <td >Hospital: </td>
                                    <td><TextField
                                        id="outlined-multiline-static"
                                        // label="Multiline"
                                        multiline
                                        name="hospital"
                                        rows="1"
                                        defaultValue={hospital}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleChange}
                                    /> </td>
                                </tr>


                            </tbody>
                        </table>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#38D4D7", color: "white", fontSize: 13, marginRight: "-95%", marginTop: "1%" }}
                            onClick={(e) => {
                                e.preventDefault();
                                let result = UpdateInfo();
                                result.then((data) => {

                                    console.log(data)
                                })



                            }}
                        >
                            Save
 </Button>

                    </Paper>
                </Grid>

            </Grid>
        </div >






    );






}