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
            </span>
        </div>
    </span>)
}

export default NavBar;