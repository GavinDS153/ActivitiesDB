import React from "react";
import NavBar from "../../generalPages/components/NavBar";
import Auth from "../components/Auth";

const AuthPage = (props) => {
    return (
        <React.Fragment>
            <NavBar />
            <Auth type={props.type} />
        </React.Fragment>
    );
}

export default AuthPage;