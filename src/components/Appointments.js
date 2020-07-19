import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Bar, Line } from "react-chartjs-2";
import { Typography, Button } from "@material-ui/core";
import { LocalHospital, DateRange, EventNote } from "@material-ui/icons";
import Calendar from "./Calendar/Calendar";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddAppointmet from "./AddAppointment";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import Slide from '@material-ui/core/Slide';
import Header from './Header';
import { Link } from "react-router-dom";
import { Message } from 'shineout'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { Redirect } from "react-router";
const columns = [
    { id: "name", label: "Name", minWidth: 170 },

    {
        id: "date",
        label: "Date",
        minWidth: 170,
        align: "left",
        format: value => value.toLocaleString()
    },
    {
        id: "time",
        label: "Time",
        minWidth: 170,
        align: "left",
        format: value => value.toLocaleString()
    },
    { id: "phone", label: "Phone", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "option", label: "Option", minWidth: 100 },

];
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#37ACEB",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
function createData(name, phone, time, classes) {
    const option = (
        <div >
            <Button
                classes={{
                    root: classes.root,
                    label: classes.label,
                }}
                variant="outlined"
                color="primary"
                style={{ marginRight: "0.5rem" }}
                startIcon={<EditIcon />}
                onClick={() => {
                    alert(name.toLocaleString());
                }}
            >
                Edit
        </Button>
            <Button
                classes={{
                    root: classes.root,
                    label: classes.label,
                }}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                    alert(name.toLocaleString());
                }}
            >
                Remove
       </Button>
        </div>
    );
    return { name, phone, time, option };
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Appointments() {
    const classes = useStyles();
    const [rows, setRows] = React.useState([]);
    const [showComponent, setShowComponent] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [forceUpdate, setForceUpdate] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const [DateAppoi, setDateAppoi] = React.useState(new Date());
    const [Name, setName] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Phone_Number, setPhoneNumber] = React.useState("");
    const [DateAppoiEdit, setDateAppoiEdit] = React.useState(new Date());
    const [NameEdit, setNameEdit] = React.useState("");
    const [EmailEdit, setEmailEdit] = React.useState("");
    const [Phone_NumberEdit, setPhoneNumberEdit] = React.useState("");
    const [EditID, setEditID] = React.useState("");
    const [DeleteID, setDeleteID] = React.useState("");
    const [EditDoctor_ID, setEditDoctor_ID] = React.useState("");
    const [openDelete, setOpenDelete] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");
    const [failure, setFailure] = React.useState(false);

    const [successEdit, setSuccessEdit] = React.useState("");
    const [failureEdit, setFailureEdit] = React.useState(false);

    const handleDeleteClickOpen = (row) => {
        setDeleteID(row._id)
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {

        setOpenDelete(false);
    };

    React.useEffect(() => {
        setSuccess(false);
        setFailure(false);
        const fetchData = async () => {
            const profile = JSON.parse(localStorage.getItem('profile'));
            const doct_id = profile._id;
            const toDate = moment().toISOString();
            const token = localStorage.getItem("token");
            await fetch("http://localhost:8000/api/auth/appointment/" + doct_id + "/" + toDate, {
                method: 'GET',
                headers: {
                    'x-access-token': token, "Access-Control-Allow-Origin": "*",
                },


            }).then((response) => response.json()).then((data) => {
                console.log(Object.keys(data))
                setRows(data)

            })
        }




        fetchData();
    }, [forceUpdate]);

    const fetchAppointments = (date) => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        const doct_id = profile._id;
        const toDate = date;
        const token = localStorage.getItem("token");
        async function fetchData() {
            await fetch("http://localhost:8000/api/auth/appointment/" + doct_id + "/" + toDate, {
                method: 'GET',
                headers: {
                    'x-access-token': token, "Access-Control-Allow-Origin": "*",
                },


            }).then((response) => response.json()).then((data) => {
                console.log(Object.keys(data))
                setRows(data)

            })
        }
        fetchData();





    }

    const AddAppointment = () => {

        const profile = JSON.parse(localStorage.getItem('profile'));
        const doct_id = profile._id;
        const toDate = date.toISOString();
        const token = localStorage.getItem("token");
        console.log(doct_id + " " + token)
        async function insertData() {

            try {
                await fetch("http://localhost:8000/api/auth/appointment", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        Doctor_ID: doct_id,
                        Name: Name,
                        Email: Email,
                        Phone_Number: Phone_Number,
                        DateAppoi: new Date(DateAppoi).toISOString()

                    }),

                }).then((response) => response.json()).then((data) => {
                    console.log(Object.keys(data))
                    console.log("Appointment Add", data)
                    if (!data.error) {
                        setSuccess(true);
                        // setSuccessMessage("Appointment have been scheduled successfully");
                    } else {

                        setFailure(true);
                        setFailure(false);
                    }


                })
            } catch (err) {
                setFailure(true);
                setFailure(false);

            }
            setSuccess(false);

        }
        insertData();

        setForceUpdate(forceUpdate + 1)


    }

    const EditAppointment = () => {


        const token = localStorage.getItem("token");

        async function updateData() {

            try {
                await fetch("http://localhost:8000/api/auth/appointment/" + EditID, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-access-token': token,
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                        Doctor_ID: EditDoctor_ID,
                        Name: NameEdit,
                        Email: EmailEdit,
                        Phone_Number: Phone_NumberEdit,
                        DateAppoi: new Date(DateAppoiEdit).toISOString()

                    }),

                }).then((response) => response.json()).then((data) => {
                    console.log(Object.keys(data))
                    if (!data.error) {
                        setSuccessEdit(true);
                        setSuccessEdit(false);
                        // setSuccessMessage("Appointment have been scheduled successfully");
                    } else {

                        setFailureEdit(true);
                        setFailureEdit(false);
                    }



                })
            } catch (err) {
                setFailureEdit(true);
                setFailureEdit(false);

            }


        }
        updateData();
        setForceUpdate(forceUpdate + 1)


    }
    const DeleteAppointment = () => {


        const token = localStorage.getItem("token");

        async function deleteData() {

            await fetch("http://localhost:8000/api/auth/appointment/" + DeleteID, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    "Access-Control-Allow-Origin": "*",
                },


            }).then((response) => response.json()).then((data) => {
                console.log(Object.keys(data))


            })
        }
        deleteData();
        handleDeleteClose();
        setForceUpdate(forceUpdate + 1)


    }
    const [findDate, setFindDate] = React.useState(new Date())
    let onSelect = (date, previousDate, currentMonth) => {
        if (moment(date).isSame(previousDate)) {
            console.info("onSelect: false", moment(date).add(1, 'days').toISOString());
            setDate(date);
            fetchAppointments(moment(date).add(1, 'days').toISOString());
            return false;
        } else if (currentMonth.isSame(date, "month")) {
            console.info("onSelect: true", moment(date).add(1, 'days').toISOString());
            setDate(date);
            fetchAppointments(moment(date).add(1, 'days').toISOString());

            return true;
        } else {
            fetchAppointments(moment(date).add(1, 'days').toISOString());
            setDate(date);
            console.info("onSelect: none", moment(date).toISOString());
        }
    };
    let selectedDate = "";
    let selectedDateAppoi = "";
    let selectedTime = "";
    let selectedName = "";
    let selectedEmail = "";
    let selectedPhoneNumber = "";
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClickOpen = () => {
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };
    const handleChange = e => {
        console.log("Started Handle Change " + e)
        console.log(e.target)
        switch (e.target.name) {
            case 'name': setName(e.target.value); return;
            case 'email': setEmail(e.target.value); return;
            case 'phone_number': setPhoneNumber(e.target.value); return;

        }



    }
    const handleEditChange = e => {
        console.log("Started Handle Change " + e)
        console.log(e.target)
        switch (e.target.name) {
            case 'nameedit': setNameEdit(e.target.value); return;
            case 'emailedit': setEmailEdit(e.target.value); return;
            case 'phone_numberedit': setPhoneNumberEdit(e.target.value); return;

        }



    }

    const set2EditData = (row) => {
        setNameEdit(row.Name)
        setEmailEdit(row.Email);
        setPhoneNumberEdit(row.Phone_Number);
        setEditID(row._id);
        setDateAppoiEdit(row.DateAppoi);
        setEditDoctor_ID(row.Doctor_ID);
        console.log(moment(row.DateAppoi).format("yyyy-MM-DD").toLocaleString().substr(0, 10) + "T" + new Date(row.DateAppoi).toLocaleTimeString('en',
            {
                timeStyle: 'short', hour12: false

            })
        )
        handleEditClickOpen();


    }
    const handleConfirm = () => {

        console.log(Name + " " + Email + " " + DateAppoi + " " + Phone_Number);
        AddAppointment();
        handleClose();

    };
    const handleEditConfirm = () => {

        console.log(NameEdit + " " + EmailEdit + " " + DateAppoiEdit + " " + Phone_NumberEdit);
        EditAppointment();
        handleEditClose();

    };
    const onTimeChange = (time) => { selectedTime = time };
    const onDateChange = (date) => { selectedDate = date };
    if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
    else
        return (
            <div className={classes.container}>

                {success ? Message.success(<div style={{ width: 350 }}>Appointment have been scheduled successfully</div>, 2, {
                    position: "bottom-right",
                    title: 'Sucessfully Scheduled',
                }) : failure && Message.warn(<div style={{ width: 320 }}>Make Sure you entered correct data</div>, 2, {
                    position: "bottom-right",
                    title: 'Unsuccesfull',
                })}

                {successEdit ? Message.success(<div style={{ width: 350 }}>Appointment have been edited successfully</div>, 2, {
                    position: "bottom-right",
                    title: 'Sucessfully Edited',
                }) : failureEdit && Message.warn(<div style={{ width: 320 }}>Make Sure you entered correct data</div>, 2, {
                    position: "bottom-right",
                    title: 'Unsuccesfull',
                })}
                <Header token={localStorage.getItem("token")} />
                <div className={classes.upperTop}>
                    <Typography className={classes.heading}>Appointments</Typography>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#37ACEB", color: "white", fontSize: 11 }}
                        component={Link} to="/Dashboard"
                    >
                        <ArrowBackIcon />
                    Back
                 </Button>

                    <Button
                        variant="contained"
                        className={classes.AddAppointmet}
                        onClick={handleClickOpen}
                    >
                        <AddIcon />
                    Add Appointment
                 </Button>
                </div>
                <div>
                    <Grid container spacing={3}>

                        <Grid item xs={5.8}>
                            <Paper className={classes.left_top_paper}>
                                <Dialog
                                    open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleDeleteClose}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle id="alert-dialog-slide-title">{"Confirm Delete"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Are you sure you want to remove this appointment from your schedule?
          </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDeleteClose} color="primary">
                                            Disagree
          </Button>
                                        <Button onClick={DeleteAppointment} color="primary">
                                            Agree
          </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title" style={{ background: "linear-gradient(to right, #38D4D7, #37ACEB)", color: "white" }}>Add New Appointment</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Enter the details for new Appointment
                                    </DialogContentText>
                                        <label style={{ width: "100%" }}>Patient Name</label>
                                        <br />
                                        <TextField

                                            margin="dense"
                                            id="name"
                                            name="name"
                                            type="text"
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                        <br />
                                        <br />
                                        <label style={{ width: "100%" }}>Email</label>
                                        <br />
                                        <TextField
                                            name="email"
                                            margin="dense"
                                            id="email"
                                            type="email"
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                        <br />
                                        <br />
                                        <label style={{ width: "100%" }}>Phone Number</label>
                                        <br />
                                        <TextField
                                            name="phone_number"
                                            margin="dense"
                                            id="phone_number"
                                            type="number"
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                        <br />
                                        <br />

                                        <TextField
                                            id="datetime-local"
                                            label="Date and Time"
                                            type="datetime-local"
                                            defaultValue="2020-05-24T10:30"
                                            onChange={(value) => { setDateAppoi(value.target.value) }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />


                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={handleClose} color="secondary">

                                            Cancel
          </Button>
                                        <Button onClick={handleConfirm} color="primary">
                                            Confirm
          </Button>
                                    </DialogActions>
                                </Dialog>





                                <Dialog open={openEdit} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title" style={{ background: "linear-gradient(to right, #38D4D7, #37ACEB)", color: "white" }}>Edit Appointment <EditIcon style={{ marginLeft: "25%" }} /></DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Enter the details to Edit Appointment
                                    </DialogContentText>
                                        <label style={{ width: "100%" }}>Patient Name</label>
                                        <br />
                                        <TextField

                                            margin="dense"
                                            id="name"
                                            name="nameedit"
                                            type="text"
                                            fullWidth
                                            value={NameEdit}
                                            onChange={handleEditChange}
                                        />
                                        <br />
                                        <br />
                                        <label style={{ width: "100%" }}>Email</label>
                                        <br />
                                        <TextField
                                            name="emailedit"
                                            margin="dense"
                                            id="email"
                                            type="email"
                                            fullWidth
                                            value={EmailEdit}
                                            onChange={handleEditChange}
                                        />
                                        <br />
                                        <br />
                                        <label style={{ width: "100%" }}>Phone Number</label>
                                        <br />
                                        <TextField
                                            name="phone_numberedit"
                                            margin="dense"
                                            id="phone_number"
                                            type="number"
                                            fullWidth
                                            value={Phone_NumberEdit}
                                            onChange={handleEditChange}
                                        />
                                        <br />
                                        <br />

                                        <TextField
                                            id="datetime-local"
                                            label="Date and Time"
                                            type="datetime-local"
                                            defaultValue={moment(DateAppoiEdit).format("yyyy-MM-DD").toLocaleString().substr(0, 10) + "T" + new Date(DateAppoiEdit).toLocaleTimeString('en',
                                                {
                                                    timeStyle: 'short', hour12: false

                                                })}
                                            onChange={(value) => { setDateAppoiEdit(value.target.value) }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />


                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={handleEditClose} color="secondary">

                                            Cancel
          </Button>
                                        <Button onClick={handleEditConfirm} color="primary">
                                            Confirm
          </Button>
                                    </DialogActions>
                                </Dialog>



                                <Calendar onSelect={onSelect} dayClasses={dayClasses} useNav={true} />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>

                            <Paper className={classes.top_paper}>
                                <Typography style={{ float: "left", color: "#37ACEB" }}>Appointments for {moment(date).format("DD/MM/YYYY").toLocaleString()}</Typography>
                                <TableContainer className={classes.container2}>
                                    <Table className={classes.table} stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <StyledTableRow >
                                                {columns.map(column => (
                                                    <StyledTableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </StyledTableCell>
                                                ))}
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(() => {
                                                if (rows.length < 1) {
                                                    return (
                                                        <p style={{ marginLeft: "180%", marginTop: 30, marginBottom: 30, width: "100%" }}>No Appointments Scheduled</p>
                                                    )
                                                }
                                            })()}
                                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
                                                map(row => {

                                                    return (
                                                        <StyledTableRow role="checkbox" style={{ height: 10 }} tabIndex={-1} key={row.id}>

                                                            <StyledTableCell align="left">
                                                                {row.Name}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="left" >
                                                                {moment(row.DateAppoi).format("dddd, MMMM D, Y")}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left" >
                                                                {moment(row.DateAppoi).format("hh:mm A")}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left" >
                                                                {row.Phone_Number}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left" >
                                                                {row.Email}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" >
                                                                <Button
                                                                    onClick={() => { set2EditData(row) }} color="primary">

                                                                    Edit
          </Button>
                                                                <Button
                                                                    onClick={() => { handleDeleteClickOpen(row) }} color="secondary">

                                                                    Delete
          </Button>

                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </div >
        );
}

let dayClasses = function (date) {
    let day = date.isoWeekday();
    if (day === 6 || day === 7) {
        return ["weekend"];
    }
    return [];
};
const useStyles = makeStyles(theme => ({

    AddAppointmet: {
        backgroundColor: "#37ACEB",
        position: "relative",
        color: "white",
        left: "98%",
        right: "5%",

        [theme.breakpoints.up('xl')]: {
            left: "94%",

        },
        [theme.breakpoints.between('lg', 'xl')]: {
            left: "95%",

        },

        [theme.breakpoints.between('md', 'lg')]: {
            left: "85%",

        },
        [theme.breakpoints.between('sm', 'md')]: {
            left: "77%",

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
    table: {},

    heading: {
        marginTop: 10,
        textAlign: "left",
        fontSize: 15,
        color: theme.palette.text.secondary,
        fontWeight: "bold"
    },
    upperTop: { marginLeft: 2, marginBottom: 16, width: "90%", justifyContent: "left", textAlign: "left" },
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
        [theme.breakpoints.up('xl')]: {
            width: "110%",

        },
        [theme.breakpoints.between('md', 'lg')]: {
            width: "105%",

        },

        [theme.breakpoints.between('sm', 'xd')]: {
            width: "110%",

        },
        [theme.breakpoints.between('xsm', 'sm')]: {
            width: "110%",

        },
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
        // [theme.breakpoints.up('xl')]: {
        //     width: "37rem"
        // },


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
        marginLeft: "5.5rem",
        marginTop: "4%",
        [theme.breakpoints.between('md', 'lg')]: {
            marginTop: "5rem"

        },
    },
    root: { width: "90px" },
    label: {

        [theme.breakpoints.between('md', 'lg')]: {
            fontSize: "9px",

        },

    }
}));
