import React from "react";
import "./NavBar.css";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (<span>
        <div className="navbar-main">
            <div className="logo-section">
                <div className="logo">Logo</div>
            </div>
            <span className="navbar-links">
                <div className="navbar-link">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar-link">
                    <Link to="/">Activites</Link>
                </div>
                <div className="navbar-link">
                    <Link to="/about">About</Link>
                </div>
                <div className="navbar-link">
                    <Link to="/profile">Profile</Link>
                </div>
            </span>
            <div className="navbar-links">
                <Link to="/auth/signup" className="auth-link">Sign Up</Link>
                <Link to="/auth/login" className="auth-link">Log In</Link>
            </div>
        </div>
    </span>)
}

export default NavBar;