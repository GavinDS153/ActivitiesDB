import React from 'react';
import ActivityItem from './ActivityItem';

function ActivitiesList(props) {
    if (props.items.length === 0) {
        return (
        <span>
            <h2>Activites Works</h2>
        </span>
        );
    }

    return (
        <span>
            {props.items.map(activity => {
                return <ActivityItem 
                name={activity.name} 
                org={activity.org} 
                dur={activity.dur}
                desc={activity.desc} 
                loc={activity.loc}
                id={activity.id} />
            })}
        </span>
    );
}

export default ActivitiesList;