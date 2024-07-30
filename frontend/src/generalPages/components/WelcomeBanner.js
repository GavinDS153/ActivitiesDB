import React from "react";
import "./WelcomeBanner.css";

const WelcomeBanner = () => {
  return (
    <React.Fragment>
      <div className="welcome-bg">
        <div className="welcome-subbox">
          <div className="welcome-intro">
            <h1>Welcome to ActivitiesDB</h1>
            <p>Your personal online guidance counselor.</p>
          </div>
          <div className="welcome-desc">
            <p>
              Browse our database of high school activities and learn more about
              each oppurtunity! Use our search and sort features to find what
              activities interest you. Create an account to get started saving
              activities to your profile!
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WelcomeBanner;
