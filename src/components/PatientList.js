
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
import ListItemLink from "./ListItemLink";
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
        maxHeight: 750,
        marginTop: 50,
        marginLeft: 50,
        marginRight: 400,
        width: "95%",
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

export default function PatientList(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => { console.log("Rendering Patient List") }, [])

    return (
        <div>
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
                                        {/* <StyledTableCell align="left">
                                            {row.PatientGender === "Male" ? <Avatar style={{
                                                marginTop: "-4%", width: "90px", height: "90px", marginLeft: "auto", marginRight: "auto",
                                            }} alt="" src={require('../static/images/avatar/male_avatar.png')} /> : ""}
                                            {row.PatientGender === "Female" ? <Avatar style={{
                                                marginTop: "-4%", width: "90px", height: "90px", marginLeft: "auto", marginRight: "auto",
                                            }} alt="" src={require('../static/images/avatar/female_avatar.png')} /> : ""}

                                            {row.PatientGender === "Other" ? <Avatar style={{
                                                marginTop: "-4%", width: "90px", height: "90px", marginLeft: "auto", marginRight: "auto",
                                            }} alt="" src={require('../static/images/avatar/other_avatar.png')} /> : ""}

                                        </StyledTableCell> */}
                                        <StyledTableCell align="left" style={{
                                            minWidth: 170
                                        }}>
                                            {row.Name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" style={{
                                            minWidth: 170
                                        }} >
                                            {row.Phone_Number}
                                        </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            {new Date(row.DOB).toISOString().substring(0, 10)}
                                        </StyledTableCell>

                                        <StyledTableCell align="right" >
                                            <ListItemLink to={{ pathname: "/Patient", passed: { Patient: JSON.stringify(row), forceUpdate: props.forceUpdate } }}
                                                text="Details"
                                                icon={<EditIcon />}
                                                classes={classes}
                                                variant="outlined"
                                                className={classes.DetailsButton}
                                                doctor="Umair Doctor" />
                                            {/* <Button
                                                variant="outlined"

                                                style={{ borderColor: "#5A75D6", color: "#5A75D6", marginRight: "0.5rem" }}
                                                startIcon={<EditIcon />}
                                                component={Link} to="/Patient">
                                                Details
                                        </Button> */}



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
        </div>






    );






}