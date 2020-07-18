
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,

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
import List from '@material-ui/core/List';

import MailIcon from '@material-ui/icons/Mail';

import FingerprintIcon from '@material-ui/icons/Fingerprint';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import BlockIcon from '@material-ui/icons/Block';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DetailsIcon from '@material-ui/icons/Details';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockIcon from '@material-ui/icons/Lock';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Typography, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
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
        maxHeight: 1000,
        marginTop: 0,

        marginLeft: "2%",
        // marginRight: "5%",
        width: "95%",
        backgroundColor: "#2F3136",
    },
    DetailsButton: { borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }
    , inputs: { width: 320 },
    sideContentLogin: {
        marginTop: "2%", marginLeft: "36%", height: 500, width: 500, borderRadius: "25px", justifyContent: "center", ddisplay: "flex", paddingTop: "2%"
        , flexDirection: "column", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "
    },
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
        // #37ACEB,#38D4D7
        backgroundColor: "#38D4D7",

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
    { id: "Email", label: "Email", minWidth: 170 },
    { id: "Phone Number", label: "Phone Number", minWidth: 170 },
    { id: "Licence", label: "Licence", minWidth: 100 },
    { id: "Licence Country", label: "Licence Country", minWidth: 100 },
    { id: "Licence Verified", label: "Licence Verified", minWidth: 100 },
    { id: "Active", label: "Active", minWidth: 100 },

];
export default function Admin(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);
    const [doctor, setDoctor] = useState("");
    const [id, setID] = useState("");
    const [openDetails, setOpenDetails] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    let [error_login, setErrorLogin] = React.useState("");
    const [email_login, setEmailLogin] = React.useState("");
    const [password_login, setPasswordLogin] = React.useState("");
    const [forceUpdate, setForceUpdate] = React.useState(0)


    async function Login() {


        let result = "";
        try {
            result = await fetch("https://bioai-node.herokuapp.com/api/Admin/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    email: email_login,
                    password: password_login
                }),

            })

        } catch (err) {
            console.log(err)
            return result = { auth: false }
        }


        return result
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const fetchData = async () => {
        const result = await axios(
            'https://bioai-node.herokuapp.com/api/Admin/DoctorList',
        );

        setRows(result.data);
    };

    useEffect(() => {

        fetchData();
    }, [forceUpdate, loggedIn]);

    function handleChange(event) {

        switch (event.target.name) {
            case "email_login":
                setEmailLogin(event.target.value); return;
            case "password_login":
                setPasswordLogin(event.target.value); return;
        }



    }
    const BlockDoctor = async (id, value) => {

        const token = localStorage.getItem("token");
        await fetch("https://bioai-node.herokuapp.com/api/Admin/Doctor/Block", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: id,
                active: value
            }),

        }).then((response) => response.json()).then((data) => {
            console.log(data);

        })

    }
    const Verify = async (id, value) => {

        console.log(value)
        const token = localStorage.getItem("token");
        await fetch("https://bioai-node.herokuapp.com/api/Admin//Doctor/Verify", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                id: id,
                licence_verified: value
            }),

        }).then((response) => response.json()).then((data) => {
            console.log(data);



        })




    }



    if (!localStorage.getItem("admin_loggedIN")) {
        // return (<h1 style={{ marginTop: "22%", marginLeft: "41%" }}>Please Login First</h1>)

        return (

            <div style={{ marginTop: "8.5%" }}>

                <h2 style={{ marginLeft: "46%", color: "gray" }}> Admin</h2>
                <div className={classes.sideContentLogin}>

                    <div style={{
                        backgroudColor: "white", color: "white", display: "flex",
                        flexDirection: "column", justifyContent: "center", marginTop: "15%", marginleft: "12%"
                    }}>

                        <form style={{
                            justifyContent: "center", display: "flex",
                            flexDirection: "column", justifyContent: "center", textAlign: "center", marginLeft: "12%", paddingBottom: "15%"

                        }} noValidate autoComplete="off">
                            <div style={{ display: "flex", flexDirection: "row" }}>

                                <LockIcon style={{ color: "#5A75D6", justifyContent: "center", marginLeft: "30%", marginBottom: "10%" }} >SignIn</LockIcon>
                                <Typography style={{ color: "#5A75D6" }}>Sign in</Typography>
                            </div>
                            <Typography style={{ color: 'red', fontSize: "13px", marginLeft: "-17%", marginTop: "-7%" }}>{error_login}</Typography>
                            <List>
                                <ListItem >
                                    <ListItemIcon><MailIcon style={{ color: "#5A75D6" }} /> </ListItemIcon>
                                    <TextField className={classes.inputs} name="email_login" onChange={handleChange} id="standard-basic" type="email" label="Email" />
                                </ListItem>
                                <ListItem  >
                                    <ListItemIcon><VpnKeyIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                    <TextField className={classes.inputs} id="filled-basic" onChange={handleChange} name="password_login" type="password" label="Password" />
                                </ListItem>

                            </List>

                            <Button style={{ marginTop: "5%", borderRadius: "25px", color: "white", backgroundImage: "linear-gradient(to right, #52A0FD, #00e2fa)", marginLeft: "22%", width: 200 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    let result = Login();


                                    result.then((data) => {
                                        console.log(data)
                                        if (data.status === 200) {

                                            localStorage.setItem("admin_loggedIN", true)
                                            setLoggedIn(true)

                                            // var token = localStorage.getItem("token")

                                            // props.history.push("/Dashboard")
                                        }
                                        else { setErrorLogin("Incorrect Email or Password"); }

                                    })





                                }}>
                                Confirm Login
                     </Button>
                        </form>



                    </div> </div></div>
        )
    }

    return (
        <div>
            <AppBar position="fixed" style={{ height: "4em", background: "linear-gradient(to right,  #37ACEB,#38D4D7)" }}>  <Typography variant="title" style={{ marginTop: "1.1em", marginLeft: "1em" }} color="inherit">
                BioAI- Admin
                <Link
                    component="button"
                    variant="outlined"
                    style={{ marginLeft: "90%", textDecoration: "none", backgroundColor: "transparent", color: "white", border: "1px solid white" }}

                    onClick={async () => {

                        await localStorage.removeItem("admin_loggedIN");
                        setLoggedIn(false);
                        window.location.reload();
                    }}
                >
                    Logout
</Link>
            </Typography></AppBar>

            <Typography style={{ fontSize: "2.4em", marginTop: "2em", color: "gray", textAlign: "center", fontWeight: "bold", }}>User Management</Typography>
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.root} stickyHeader aria-label="sticky table">
                    <TableHead>

                        <StyledTableRow>

                            {columns.map(column => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth
                                    }}
                                >
                                    {column.label}
                                </StyledTableCell>

                            )
                            )
                            }
                            <StyledTableCell
                                key="option"
                                align="center"
                                style={{
                                    minWidth: 170
                                }}
                            >
                                Options
                                </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>


                        {console.log(Object.keys(rows))}
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
                            map(row => {

                                return (
                                    <StyledTableRow role="checkbox" style={{ height: 10 }} tabIndex={-1} key={row.id}>

                                        <StyledTableCell align="left" style={{
                                            minWidth: 170
                                        }}>
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" style={{
                                            minWidth: 170
                                        }} >
                                            {row.cnic}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" style={{
                                            minWidth: 170
                                        }} >
                                            {row.email}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" style={{
                                            minWidth: 170
                                        }} >
                                            {row.phone_number}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {row.licence}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {row.licence_country}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {row.licence_verified ? <DoneIcon style={{ color: "green" }} /> : <CloseIcon style={{ color: "red" }} />}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {row.active ? <DoneIcon style={{ color: "green" }} /> : <CloseIcon style={{ color: "red" }} />}
                                        </StyledTableCell>

                                        <StyledTableCell align="right" >

                                            {/* <Button
                                                variant="outlined"

                                                style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }}
                                                startIcon={<DetailsIcon />}
                                            // onClick={}
                                            >
                                                Details
                                        </Button> */}
                                            {row.active ?
                                                <Button
                                                    variant="outlined"

                                                    style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }}
                                                    startIcon={<BlockIcon style={{ color: "red" }} />}
                                                    onClick={() => { BlockDoctor(row._id, false); setForceUpdate(forceUpdate + 1); }}>
                                                    Block
                                        </Button> :
                                                <Button
                                                    variant="outlined"

                                                    style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem", fontSize: 11, width: 95 }}
                                                    startIcon={<DoneIcon size="10px" style={{ color: "green" }} />}
                                                    onClick={() => { BlockDoctor(row._id, true); setForceUpdate(forceUpdate + 1); }}>
                                                    Unblock
                                        </Button>}
                                            {!row.licence_verified ?
                                                <Button
                                                    variant="outlined"

                                                    style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem", fontSize: 13 }}
                                                    startIcon={<VerifiedUserIcon style={{ color: "green" }} />}
                                                    onClick={() => { Verify(row._id, true); setForceUpdate(forceUpdate + 1); }}>
                                                    Verify Licence
                                        </Button>
                                                :
                                                <Button
                                                    variant="outlined"

                                                    style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem", fontSize: 11 }}
                                                    startIcon={<VerifiedUserIcon style={{ color: "red" }} />}
                                                    onClick={() => { Verify(row._id, false); setForceUpdate(forceUpdate + 1); }}>
                                                    Unverify Licence
                                        </Button>
                                            }


                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 60, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{ marginRight: "1.8rem", color: "#3F51B5" }}
            />
        </div >






    );






}