import React from "react";
import NavBar from "../../generalPages/components/NavBar";
import Auth from "../components/Auth";

const AuthPage = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Auth />
        </React.Fragment>
    );
}

export default AuthPage;