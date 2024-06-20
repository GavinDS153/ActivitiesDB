import React from "react";
import "./WelcomeBanner.css";

const WelcomeBanner = () => {
  return (
    <React.Fragment>
      <div className="welcome-bg">
        <div className="welcome-subbox">
          <h1>Welcome to ActivitiesDB</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomeBanner;
