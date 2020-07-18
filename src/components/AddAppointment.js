import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles(theme => ({

}));

const AddAppointment = (props) => {
    const [open, setOpen] = React.useState(false);
    const [Doctor_ID, setDoctorID] = React.useState("");
    const [Name, setName] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Phone_Number, setPhoneNumber] = React.useState("");
    const [DateAppoi, setDateAppoi] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                style={{ backgroundColor: "#4D5365", color: "white", marginRight: "-10%", fontSize: 11, float: "right" }}
                onClick={handleClickOpen()}
            >
                <AddIcon />
                Add Appointment
                 </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
            </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AddAppointment;
