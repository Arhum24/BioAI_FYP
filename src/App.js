import React from "react";
import "./App.css";
import AddPatient from "./components/AddPatient";
import AddDiagnosis from "./components/AddDiagnosis";
import Dashboard from "./components/Dashboard";
import Appointments from "./components/Appointments";
import Patient from "./components/Patient";
import PDFMake from "./components/pdfMake";
import PatientsMain from "./components/PatientsMain";
import DiagnosisMain from "./components/DiagnosisMain";
import history from './components/history';
import Header from './components/Header';
import PDFShow from "./components/pdf";

import PageNotFound from "./components/PageNotFound";
import Autherization from "./components/Autherization";
import FAQs from "./components/FAQ";
import Admin from "./components/Admin";
import Logout from "./components/logout";
import BioScan from "./components/BioScan";
import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import DoctorProfile from "./components/DoctorProfile";



function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"))
  const toggle = function () {
    setToken(localStorage.getItem("token"));
  }
  const loggedIn = function () {

    setToken(localStorage.getItem("token"));

  }


  return (
    <Router history={history}>
      {/* <Header /> */}
      <Switch>
      <Route
                exact
                path="/"
                render={() => {
                    return (
                    
                      <Redirect to="/Autherization" /> 
                     
                    )
                }}
              />
        <Route path="/AddPatient" component={AddPatient} />
        <Route path="/AddDiagnosis" component={AddDiagnosis} />
        <Route path="/Dashboard" ><Dashboard update={loggedIn} /></Route>
        <Route path="/Patient" component={Patient} />
        <Route path="/Appointments" component={Appointments} />
        <Route path="/PatientsMain" component={PatientsMain} />
        <Route path="/DiagnosisMain" component={DiagnosisMain} />
        <Route path="/PDFMake" component={PDFMake} />
        <Route path="/FAQ" component={FAQs} />
        <Route path="/Autherization" component={Autherization} />
        <Route path="/logout" ><Logout update={toggle} /></Route>
        <Route path="/Admin" component={Admin} />
        <Route path="/Profile" component={DoctorProfile} />
        <Route path="/PDFShow" component={PDFShow} />
        <Route path="/BioScan" component={BioScan} />
        <Route path="/*" component={PageNotFound} />
      </Switch>

    </Router>

  );
}
export default App;
;
