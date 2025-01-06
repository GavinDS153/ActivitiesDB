import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <span>
      <div className="navbar-main">
        <div className="logo-section">
          <div className="logo">Logo</div>
        </div>
        <span className="navbar-links">
          <div className="navbar-link">
            <Link to="/" className="navbar-text">
              Home
            </Link>
          </div>
          <div className="navbar-link">
            <Link to="/" className="navbar-text">
              Activites
            </Link>
          </div>
          <div className="navbar-link">
            <Link to="/about" className="navbar-text">
              About
            </Link>
          </div>
          <div className="navbar-link">
            <Link to="/profile" className="navbar-text">
              Profile
            </Link>
          </div>
        </span>
        <div className="navbar-links">
          <Link to="/auth/signup" className="navbar-text">
            Sign Up
          </Link>
          <Link to="/auth/login" className="navbar-text">
            Log In
          </Link>
        </div>
      </div>
    </span>
  );
};

export default NavBar;
