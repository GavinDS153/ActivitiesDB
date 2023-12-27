import React from "react";
import "./ActivityItem.css";
import {Link} from "react-router-dom";

const ActivityItem = (props) => {
    return (
        <span>
            <div className="activity-item-block">
                <h1 className="activityName">{props.name}</h1>
                <h2 className="activityOrg">{props.org}</h2>
                <h4 className="activityLoc">{props.loc}</h4>
                <h4 className="activityDur">{props.dur}</h4>
                <p className="activityDesc">{props.desc}</p>
                <Link className="activityLink" to={"/" + props.id}>More Info</Link>
            </div>
        </span>
    );
}

export default ActivityItem;