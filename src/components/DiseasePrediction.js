import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import Header from './Header'
//import './ImageUpload.css';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="./Dashboard">
                BioAI Labs
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        marginTop: "3%",
        height: "100%"
    },
    heroButtons: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(4, 20, 0),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "8%"

    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
        paddingTop: theme.spacing(2)
    },
}));

const cards = [1, 2, 3];

export default function DiseasePrediction() {
    const classes = useStyles();
    const [received, setReceived] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [file, setFile] = useState({});
    const [displayfile, setDisplay] = useState({});
    const messagesEnd = useRef(null);
    const selectFile = useRef(null);
    const [progress, showProgress] = useState(false);
    const [predicted_values, setPredicted] = useState({});
    const [startUpload, setStartUpload] = useState(false);
    const [imgSrc, setImageSRC] = useState();
    useEffect(() => {
        if (startUpload) {
            console.log('Uploading Media');
            uploadPhoto()
        }
    }, [startUpload]);

    useEffect(() => {
        if (showResults) {
            setReceived(false);
            messagesEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [showResults])
    const StyledCircularProgress = withStyles((theme) => ({

        circle: {
            color: "red"

        }


    }))(CircularProgress)
    function onChangeFile(event) {
        event.stopPropagation();
        showProgress(true);
        event.preventDefault();
        var file = event.target.files[0];
        var displayfile = URL.createObjectURL(event.target.files[0]);
        setDisplay(displayfile);
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setImageSRC([reader.result])

        }.bind(this);
        console.log(url) // Would see a path?
        if (file) {
            showProgress(true);
            setFile(file);
            setStartUpload(true);
        }
    }

    function uploadPhoto() {

        const formData = new FormData();
        formData.append("myimage", file);
        const API = "http://127.0.0.1:8000/diseasePrediction/";
        console.log(formData);
        axios
            .post(API, formData)
            .then(res => {



                const Predicted = res.data.Suspected;
                setPredicted(Predicted);
                showProgress(false);
                setReceived(true);

                console.log("predicted values", setPredicted);

            }).catch((err) => {
                console.log(err.response);
                alert("Error");
                showProgress(false);
            });




        // setTimeout(() => {
        //   setPredicted(["Disease A","Disease B"]);
        //   showProgress(false);
        //   setReceived(true);
        // }, 2000);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Header token={localStorage.getItem("token")} />

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    {progress && (
                        <StyledCircularProgress color="white" size="50px" style={{
                            position: "fixed",
                            top: "58%",
                            left: "48%",
                        }} ></StyledCircularProgress >
                    )}
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Upload X-Ray Image
                </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Select a file in jpeg/png format.<br />
                   The file will be uploaded to our Server and our AI will run intelligent scan over it, to help predict any Lung Disease.
                </Typography>
                        <div className={classes.heroButtons}>
                            <input type="file" ref={selectFile} style={{ display: 'none' }} onChange={onChangeFile} />
                            <Button variant="contained" color="primary" onClick={() => {
                                selectFile.current.click()

                                setShowResults(false);
                                setStartUpload(false);

                            }}>
                                Choose File To Upload
                      </Button>
                            <table style={{ marginLeft: "-90px", marginTop: "15px", width: "400px" }}>
                                <td style={{ height: "400px", border: "1px solid gray" }}>
                                    {imgSrc ? <img style={{ minWidth: "100%", minHeight: "100%", maxWidth: "100%", maxHeight: "100%" }} src={imgSrc} /> : <h3 style={{ minWidth: "100%", marginLeft: "35%", marginTop: "45%", color: "gray", minHeight: "100%", maxWidth: "100%", maxHeight: "100%" }}>Image Preview</h3>}
                                </td>
                            </table>
                        </div>
                        {received && (
                            <div className={classes.heroButtons}>
                                <Button variant="outlined" color="primary" onClick={() => {
                                    setShowResults(true);
                                }}>
                                    View Results
                    </Button>
                            </div>
                        )}
                    </Container>
                </div>

                {showResults && (
                    <Container className={classes.cardGrid} maxWidth="md" ref={messagesEnd}>
                        {/* End hero unit */}
                        <h3>Results:</h3>
                        <Grid container spacing={4}>
                            {predicted_values.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={displayfile}
                                            title={card}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2" style={{ color: "green" }}>
                                                {card}
                                            </Typography>
                                            <Typography>
                                                This system is not meant to replace doctor's opinion but it is to facilitate the doctor. The Results
                                                from the system are not 100 % accurate. So, doctor need to make his/her own intelligent judgement
                                                about the analysis result.
                          </Typography>
                                        </CardContent>

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                )}
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Bio AI
            </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}