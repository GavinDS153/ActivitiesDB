import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Profile.css";
import ActSingle from "./ActSingle";

const Profile = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [loadedProfile, setLoadedProfile] = useState(false);
  const [loadedActivities, setLoadedActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/activities`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setLoadedActivities(responseData.activities);
      } catch (err) {
        console.log(err);
      }
    };
    getActivities();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const userResponseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setLoadedProfile(userResponseData);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, []);

  if (loadedProfile) {
    return (
      <React.Fragment>
        <div className="profile-overview">
          <h1>My Profile</h1>
          <h2>{loadedProfile.username}</h2>
          <h2>{loadedProfile.email}</h2>
        </div>
        <div className="activities-section">
          <div className="activities-header">
            <h2>Activities</h2>
          </div>
          <span>
            {loadedActivities.map((activity) => {
              return <ActSingle name={activity.name} org={activity.org} />;
            })}
          </span>
        </div>
      </React.Fragment>
    );
  } else {
    return <h1>SIGN IN!!!</h1>;
  }
};

export default Profile;
