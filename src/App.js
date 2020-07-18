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
import DiseasePrediction from "./components/DiseasePrediction";
import {
  Switch,
  Route, Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import DoctorProfile from "./components/DoctorProfile";



function App() {



  return (
    <Router history={history}>
      {/* <Header /> */}
      <Switch>
        <Route path="/AddPatient" component={AddPatient} />
        <Route path="/AddDiagnosis" component={AddDiagnosis} />
        <Route path="/Dashboard"
          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <Dashboard />
            }
          }}

        />






        <Route path="/Patient" component={Patient} />
        <Route path="/Appointments"

          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <Appointments />
            }
          }}


        />
        <Route path="/PatientsMain" component={PatientsMain} />
        <Route path="/DiagnosisMain" component={DiagnosisMain} />
        <Route path="/PDFMake" component={PDFMake} />
        <Route path="/FAQ"

          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <FAQs />
            }
          }}

        />
        <Route path="/Autherization" component={Autherization} />
        <Route path="/logout" ><Logout /></Route>
        <Route path="/Admin" component={Admin} />
        <Route path="/Profile"

          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <DoctorProfile />
            }
          }}

        />
        <Route path="/PDFShow" component={PDFShow} />
        <Route path="/BioScan"

          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <BioScan />
            }
          }}

        />
        <Route path="/DiseasePrediction"

          render={() => {

            if (!localStorage.getItem("token") || JSON.parse(localStorage.getItem("profile")).auth == false)
              return (
                <Redirect to="/Autherization" />

              )
            else {

              return <DiseasePrediction />
            }
          }}




        />
        <Route
          exact
          path="/"
          render={() => {

            localStorage.clear();
            return (
              <Redirect to="/Autherization" />

            )
          }}
        />
        <Route path="/*" component={PageNotFound} />

      </Switch>

    </Router>

  );
}
export default App;
;
