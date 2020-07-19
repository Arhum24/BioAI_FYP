

import React from "react";


import { withRouter, Redirect } from 'react-router-dom';




function Logout(props) {

    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    return (

        <Redirect to="/Autherization" />



    );
}
export default withRouter(Logout);