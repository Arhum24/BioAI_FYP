
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TablePagination from '@material-ui/core/TablePagination';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PDFShow from "./pdf";
import moment from 'moment';
import ListItemLink from "./ListItemLink";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    container: {
        maxHeight: 850,
        margin: 0,
        width: "100%",
    },
    DetailsButton: { borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }
}));
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
        backgroundColor: "#5A75D6",

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

export default function DiagnosisList(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [PDF, setPDF] = React.useState(false);
    const [Patient_ID, setPatientID] = React.useState(0);
    const [Diagnosis_ID, setDiagnosisID] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [toDelete, setDelete] = React.useState();
    var d = {
        Doctor_ID: "",
        Patient_ID: "",
        DiseaseName: "",
        // 'LastName': LastName,
        Tests: [],
        Medicines: [],
        Medicines_Notes: "",
        Symptoms: [],
        Findings: "",
        Recommended_Foods: [],
        Preventive_Foods: [],
        Diet_Note: "",
        // 'Email': Email,
        Comments: "",
        Date: Date,

    }
    const [diagnosis, setDiagnosis] = React.useState(d);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [open, setOpen] = React.useState(false);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleClickOpenDetails = (row) => {
        setDiagnosis(row)
        setOpenDetails(true);
    };

    const handleDetailsClose = () => {
        setOpenDetails(false);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        async function deleteDiagnosis() {
            var token = localStorage.getItem("token");

            let result = "";
            try {
                await fetch("http://localhost:8000/api/auth/diagnosis/" + toDelete, {
                    method: 'DELETE',


                    headers: {

                        'x-access-token': token,
                        "Access-Control-Allow-Origin": "*",
                    },

                }).then((response) => response.json()).then((data) => {
                    result = data
                    console.log(data)

                })
                return result

            } catch (err) {

                return result = { auth: false }
            }
        }


        var result = deleteDiagnosis();

        props.forceUpdateDiagnosis()
        handleSnackClick();

        setOpen(false);
    };
    const handleSnackClick = () => {
        setOpenSnack(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => { console.log("Rendering Diagnosis List") }, [])

    return (
        <div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message="Deleted Successfully"
                action={
                    <React.Fragment>

                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this diagnosis?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
          </Button>
                    <Button onClick={handleDelete} color="primary">
                        Agree
          </Button>
                </DialogActions>
            </Dialog>



            <Dialog open={openDetails} onClose={handleDetailsClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#5A75D6", color: "white" }}>Diagnosis Details </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: "black" }}>

                    </DialogContentText>

                    <div style={{ display: "flex", flexDirection: "column" }}>

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Symptoms:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Symptoms.map((value) => { return <li>{value}</li> })}
                            </Typography>
                        </div>

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Clinical Findings:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Findings}
                            </Typography>
                        </div>

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Medicines:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Medicines.map((value) => { return <li>{value}</li> })}
                            </Typography>
                        </div>

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Medication Instruction:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Medicines_Notes}
                            </Typography>
                        </div>

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Recommended Foods:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Recommended_Foods.map((value) => { return <li>{value}</li> })}
                            </Typography>
                        </div >

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Preventive Foods:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Preventive_Foods.map((value) => { return <li>{value}</li> })}
                            </Typography>
                        </div >

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Diet Instruction:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Diet_Note}
                            </Typography>
                        </div >

                        <div style={{ display: "block", justifyContent: "left", margin: 10 }}>
                            <h3 style={{ textAlign: "left", color: "#5A75D6" }}>
                                Doctor's Comments:
                           </h3>
                            <Typography style={{ display: "block", textAlign: "left" }}>
                                {diagnosis.Comments}
                            </Typography>
                        </div >





                    </div >
                </DialogContent >
                <DialogActions>
                    <Button onClick={handleDetailsClose} color="primary">
                        Done
                        </Button>

                </DialogActions>
            </Dialog >
            <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.root} stickyHeader aria-label="sticky table">
                    <TableHead>

                        <StyledTableRow>

                            {props.columns.map(column => (
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
                                align="right"
                                style={{
                                    minWidth: 170
                                }}
                            >
                                Option
                                </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>


                        {console.log(Object.keys(props.rows))}
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).
                            map(row => {

                                return (
                                    <StyledTableRow role="checkbox" style={{ height: 10 }} tabIndex={-1} key={row.id}>

                                        <StyledTableCell align="left">
                                            {row.Findings}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {row.Symptoms.map((value) => { return value + " " })}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {moment(row.Date).format("YYYY-MM-DD")}
                                        </StyledTableCell>

                                        <StyledTableCell align="right" >
                                            <Button
                                                variant="outlined"

                                                style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }}
                                                startIcon={<EditIcon />}
                                                onClick={() => { handleClickOpenDetails(row) }}>
                                                Details
                                        </Button>
                                            <Button
                                                variant="outlined"

                                                style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => {
                                                    setDelete(row._id);
                                                    handleClickOpen();

                                                }}>
                                                Delete
                                        </Button>
                                            {/* <Button
                                                variant="outlined"

                                                style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => {
                                                    setPatientID(row.Patient_ID)
                                                    setDiagnosisID(row._id)
                                                    setPDF(true);
                                                }}>
                                                PDF
                                        </Button> */}
                                            <ListItemLink to={{ pathname: "/PDFShow", passed: { Patient_ID: row.Patient_ID, Diagnosis_ID: row._id } }}
                                                text="Generate PDF"
                                                icon={<EditIcon />}
                                                variant="outlined"
                                                className={classes.DetailsButton}
                                                doctor="Umair Doctor" />



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
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{ marginRight: "1.8rem", color: "#3F51B5" }}
            />
        </div >






    );






}