import * as React from 'react';
import { Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';
import Header from './Header';
import { Redirect } from "react-router-dom";
export default function PageNotFound() {
    if (!localStorage.getItem("token")) { return <Redirect to='/Autherization' /> }
    else
        return (


            <div>
                {/* <Header token={localStorage.getItem("token")} /> */}
                <Box alignItems="center" style={{ marginTop: "20%", left: "50%", right: "50%", marginLeft: "33%" }} display="flex">
                    <Box>
                        <SearchIcon style={{ marginTop: "0.2rem", fontSize: "120px" }} />
                    </Box>
                    <Box display="">
                        <Typography style={{ fontSize: "60px" }}>404- Page Not Found
              </Typography>
                    </Box>

                </Box>
                <Typography style={{ fontSize: "20px", marginLeft: "30px" }}>Please visit a valid URL
         </Typography>
            </div>


        );

}