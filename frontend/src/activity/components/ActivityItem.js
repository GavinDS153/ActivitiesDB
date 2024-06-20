import React, { useContext } from "react";
import "./ActivityItem.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ActivityItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const saveActivity = async () => {
    if (auth.isLoggedIn) {
      try {
        await sendRequest(
          "http://localhost:5000/api/activities/save/" + props.id,
          "PATCH",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Error");
    }
  };

  return (
    <span>
      <div className="activity-item-block">
        <h1 className="activityName">{props.name}</h1>
        <h2 className="activityOrg">{props.org}</h2>
        <h4 className="activityLoc">{props.loc}</h4>
        <h4 className="activityDur">{props.dur}</h4>
        <p className="activityDesc">{props.desc}</p>
        <Link className="activityLink" to={"/" + props.id}>
          More Info
        </Link>
        <button onClick={saveActivity} className="save-button">
          Save
        </button>
      </div>
    </span>
  );
};

export default ActivityItem;
