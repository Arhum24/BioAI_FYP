import React from "react";


import { Link } from 'react-router-dom'


import {

    Button,

} from "@material-ui/core";


export default function ListItemLink(props) {
    const renderLink = itemProps => { console.log(itemProps); return <Link to={props.to} {...itemProps} /> };
    const { icon, text } = props;
    const className = props.className;
    const variant = props.variant;
    return (
        <Button
            variant={variant ? variant : "contained"}
            className={className}
            component={renderLink}

            startIcon={icon}

        >
            {text}
        </Button>
    );
}


