import React from "react";
import {Link} from "react-router-dom";
import "./AuthButton.css";

const AuthButton = props => {
    return (
        <Link className="auth-button" type={props.type} onClick={props.onClick} to={"/auth" + props.toWhere}>{props.text}</Link>
    );
}

export default AuthButton;