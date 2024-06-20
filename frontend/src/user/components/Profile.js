import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Profile = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProfile, setLoadedProfile] = useState(false);
  const [loadedActivities, setLoadedActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/activities",
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
          "http://localhost:5000/api/users/profile",
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
        <h1>{loadedProfile.email}</h1>
        <h2>{loadedProfile.username}</h2>
        <span>
          {loadedActivities.map((activity) => {
            return <h1>{activity.name}</h1>;
          })}
        </span>
      </React.Fragment>
    );
  } else {
    return <h1>SIGN IN!!!</h1>;
  }
};

export default Profile;
