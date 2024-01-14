import React from "react";
import "./AuthButton.css";

const AuthButton = props => {
    return (
        <button className="auth-button" type={props.type} onClick={props.onClick}>{props.text}</button>
    );
}

export default AuthButton;