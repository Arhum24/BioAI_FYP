import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Bar, Line } from "react-chartjs-2";
import { Typography, Button } from "@material-ui/core";
import { LocalHospital, DateRange, EventNote } from "@material-ui/icons";
import DashBoardTable from "./DashBoardTable";
import Header from './Header';
import { Redirect } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Dashboard(props) {
  const classes = useStyles();
  const [totalAppointments, setTotalAppointments] = React.useState("Server Error...")
  const [totalWeeklyAppointments, setTotalWeeklyAppointments] = React.useState("Server Error...")
  const [totalPatients, setTotalPatients] = React.useState("Server Error...")
  const [LineGraphData, setLineGraphData] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [GraphValues, setGraphValues] = React.useState([])
  const [graph2Names, setGraph2Names] = React.useState([]);
  const [GraphNames, setGraphNames] = React.useState([])
  const [rows, setRows] = React.useState([])
  const [isFetched, setFetched] = React.useState(false);

  const columns = [
    { id: "PatientName", label: "Patient Name", minWidth: 100 },
    { id: "PatientPhone", label: "Phone Number", minWidth: 170 },
    { id: "PatientEmail", label: "Email", minWidth: 170 },
    { id: "PatientCNIC", label: "CNIC", minWidth: 170 },
    { id: "PatientDOB", label: "Date of Birth", minWidth: 100 },

  ];
  React.useEffect(() => {



    async function fetchData() {
      const token = localStorage.getItem("token");

      const profile = JSON.parse(localStorage.getItem('profile'));
      const doct_id = profile._id
      try {

        await fetch("https://bioai-node.herokuapp.com/api/WeekAppointment/" + doct_id, {
          method: 'GET',
          headers: {
            'x-access-token': token, "Access-Control-Allow-Origin": "*",
          },
          // body: new URLSearchParams({
          //   'Did': doct_id


          // })

        }).then((response) => response.json()).then((data) => {
          console.log("Weekly Appointment")
          console.log(data[0].count)
          setTotalWeeklyAppointments(data[0].count)

        })
      } catch (error) {

        setTotalWeeklyAppointments(0)
      }

      try {
        await fetch("https://bioai-node.herokuapp.com/api/firstPatients/" + doct_id, {
          method: 'GET',
          headers: {
            'x-access-token': token, "Access-Control-Allow-Origin": "*",
          },
          // body: new URLSearchParams({
          //   'Did': doct_id


          // })

        }).then((response) => response.json()).then((data) => {
          console.log("Patients")
          console.log(data)
          setRows(data)

        })
      } catch (err) {


      }

      try {
        await fetch("https://bioai-node.herokuapp.com/api/allAppointments/" + doct_id, {
          method: 'GET',
          headers: {
            'x-access-token': token, "Access-Control-Allow-Origin": "*",
          },
          // body: new URLSearchParams({
          //   'Did': doct_id


          // })


        }).then((response) => response.json()).then((data) => {
          console.log("Total Appointments")
          console.log(data.count)
          setTotalAppointments(data.count)

        })
      } catch (err) {
        setTotalAppointments(0)

      }




      await fetch("https://bioai-node.herokuapp.com/api/allPatients/" + doct_id, {
        method: 'GET',
        headers: {
          'x-access-token': token, "Access-Control-Allow-Origin": "*",
        },
        // body: new URLSearchParams({
        //   'Did': doct_id


        // })


      }).then((response) => response.json()).then((data) => {
        console.log("Total Patients")
        console.log(data.count)
        setTotalPatients(data.count)

      })

      await fetch("https://bioai-node.herokuapp.com/api/graphDate/" + doct_id, {
        method: 'GET',
        headers: {
          'x-access-token': token, "Access-Control-Allow-Origin": "*",
        },
        // body: new URLSearchParams({
        //   'Did': doct_id


        // })


      }).then((response) => response.json()).then((data) => {
        console.log("Graph Date")
        let graphData = LineGraphData
        data.map((value, key) => {
          console.log("Key = ")
          console.log(key)
          console.log("Value")
          console.log(value._id.year)
          if (value._id.year === new Date().getFullYear()) {

            graphData[value._id.month - 1] = value.count

          }



        })
        console.log(graphData[5])
        setLineGraphData(graphData)
        setGraph2Names(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
        // setTotalPatients(data.count)

      })


      await fetch("https://bioai-node.herokuapp.com/api/graphDisease", {
        method: 'GET',
        headers: {
          'x-access-token': token, "Access-Control-Allow-Origin": "*",
        },
        // body: new URLSearchParams({
        //   'Did': doct_id


        // })


      }).then((response) => response.json()).then((data) => {
        console.log("Graph Date")
        let graphNames = []
        let graphValues = []
        data.map((value, key) => {
          console.log("Key = ")
          console.log(key)
          console.log("Value")
          console.log(value)
          value.Diseases.map((value, key) => {
            console.log(value.Findings)
            graphNames.push(value.Findings)
            console.log(value.count)
            graphValues.push(value.count)


          })




        })
        setGraphNames(graphNames);
        setGraphValues(graphValues);

      })


    }
    if (localStorage.getItem("token")) {
      try {
        fetchData()
      }
      catch (err) {
        alert(err)

      }

      setFetched(true);
    }



  }, [LineGraphData]);

  const data = {
    labels: GraphNames,
    datasets: [
      {
        label: "Diseases",
        backgroundColor: "#5A75D6",
        borderColor: "#4D5365",
        data: GraphValues
      }
    ]
  };
  const line_data = {
    labels: graph2Names,
    datasets: [
      {
        label: "Patients",
        backgroundColor: "#5A75D6",
        borderColor: "#4D5365",
        data: LineGraphData
      }
    ]
  };

  if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
  else if (!isFetched) { return <Header token={localStorage.getItem("token")} /> }
  else if (!localStorage.getItem("profile")) { return <Redirect to='/Autherization' /> }

  else
    return (
      <div className={classes.container}>
        <Header token={localStorage.getItem("token")} />

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.top_paper}>
              <Typography style={{ fontSize: 15, paddingLeft: 20 }}>
                Total Appointments: {totalAppointments}
              </Typography>
              <DateRange style={{ fontSize: 27, color: "#5A75D6" }} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.top_paper}>
              <Typography>Total Patients: {totalPatients} </Typography>
              <LocalHospital style={{ fontSize: 27, color: "#5A75D6" }} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.top_paper}>
              <Typography> Appointments This Week: {totalWeeklyAppointments}</Typography>
              <EventNote style={{ fontSize: 27, color: "#5A75D6" }} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.mid_paper}>
              <Typography>Disease Analysis</Typography>
              <Bar data={data} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.mid_paper}>
              <Typography>Work Analysis</Typography>
              <Line data={line_data} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.end_paper}>
              <Typography>Latest patient</Typography>
              <DashBoardTable rows={rows}
                columns={columns}
              ></DashBoardTable>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}
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
  }, heading: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 17,
    color: theme.palette.text.secondary,
    fontWeight: "bold"
  },
  top_paper: {
    marginTop: 10,
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 15,
    border: 1
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
  container: { margin: 45, marginLeft: "6%" }
}));
