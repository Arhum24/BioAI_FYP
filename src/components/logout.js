

import React from "react";


import { withRouter, Redirect } from 'react-router-dom';




function Logout(props) {

    localStorage.removeItem("token")
    props.update();
    return (

        <Redirect to="/Autherization" />



    );
}
export default withRouter(Logout);