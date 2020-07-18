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
  const [totalAppointments, setTotalAppointments] = React.useState("Fetching")
  const [totalWeeklyAppointments, setTotalWeeklyAppointments] = React.useState("Fetching")
  const [totalPatients, setTotalPatients] = React.useState("Fetching")
  const [LineGraphData, setLineGraphData] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [GraphValues, setGraphValues] = React.useState([])
  const [graph2Names, setGraph2Names] = React.useState([]);
  const [GraphNames, setGraphNames] = React.useState([])
  const [rows, setRows] = React.useState([])
  const [isFetched, setFetched] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [gradient, setGradient] = React.useState("");
  const [gradient2, setGradient2] = React.useState("");
  // setBeginGrad("#2AB6D3");
  //         setEndGrad("#3CDD9F");
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

          setRows(data)

        })
      } catch (err) {

        setError(true);

      }

      try {
        await fetch("https://bioai-node.herokuapp.com/api/allAppointments/" + doct_id, {
          method: 'GET',
          headers: {
            'x-access-token': token, "Access-Control-Allow-Origin": "*",
          },



        }).then((response) => response.json()).then((data) => {

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


      }).then((response) => response.json()).then((data) => {

        setTotalPatients(data.count)

      })

      await fetch("https://bioai-node.herokuapp.com/api/graphDate/" + doct_id, {
        method: 'GET',
        headers: {
          'x-access-token': token, "Access-Control-Allow-Origin": "*",
        },


      }).then((response) => response.json()).then((data) => {

        let graphData = LineGraphData
        data.map((value, key) => {

          if (value._id.year === new Date().getFullYear()) {

            graphData[value._id.month - 1] = value.count

          }



        })

        setLineGraphData(graphData)
        setGraph2Names(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);


      })


      await fetch("https://bioai-node.herokuapp.com/api/graphDisease", {
        method: 'GET',
        headers: {
          'x-access-token': token, "Access-Control-Allow-Origin": "*",
        },


      }).then((response) => response.json()).then((data) => {

        let graphNames = []
        let graphValues = []
        data.map((value, key) => {

          value.Diseases.map((value, key) => {

            graphNames.push(value.Findings)

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
        setFetched(true);
      }
      catch (err) {
        alert(err)

      }

      setFetched(true);
    }

    var ctx = document.getElementById('canvas').getContext("2d")
    var gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, '#38D4D7')
    gradient.addColorStop(1, '#37ACEB')
    setGradient(gradient)
  }, [LineGraphData]);

  const data = {
    labels: GraphNames,

    datasets: [
      {
        label: "Diseases",
        // backgroundColor: "#5A75D6",
        backgroundColor: gradient,
        borderColor: "#4D5365",
        hoverBackgroundColor: '#38D4D7',
        hoverBorderColor: 'yellow',
        borderWidth: 1,
        data: GraphValues
      }
    ]
  };
  const line_data = {
    labels: graph2Names,
    datasets: [
      {
        label: "Patient's Registered",
        backgroundColor: gradient,
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: LineGraphData
      }
    ]
  };

  if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
  else if (error) { alert("Server Side Error"); return <Redirect to='/Autherization' /> }
  // else if (!isFetched) { return <Header token={localStorage.getItem("token")} /> }
  else if (!localStorage.getItem("profile")) { return <Redirect to='/Autherization' /> }

  else
    return (
      <div className={classes.container}>
        <Header token={localStorage.getItem("token")} />
        <h3 style={{ color: "gray" }}>Dashboard</h3>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.top_paper}>
              <Typography style={{ fontSize: 15, paddingLeft: 20 }}>
                Total Appointments: {totalAppointments}
              </Typography>
              <DateRange style={{ fontSize: 27, color: "#38D4D7" }} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.top_paper}>
              <Typography>Total Patients: {totalPatients} </Typography>
              <LocalHospital style={{ fontSize: 27, color: "#38D4D7" }} />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.top_paper}>
              <Typography> Appointments This Week: {totalWeeklyAppointments}</Typography>
              <EventNote style={{ fontSize: 27, color: "#38D4D7" }} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.mid_paper}>
              <Typography>Disease Analysis</Typography>
              <Bar id='canvas' options={{
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }} data={data} />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Paper className={classes.mid_paper}>
              <Typography>Work Analysis</Typography>
              <Line id='canvas2' data={line_data} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.end_paper}>
              <Typography>Latest patient</Typography>
              <DashBoardTable rows={rows}
                columns={columns}
              ></DashBoardTable>
              {isFetched & <CircularProgress />}
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
