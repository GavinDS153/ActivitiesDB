import React, {useEffect, useState} from "react";
import ActivitiesList from "../components/ActivitiesList";

const Activities = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedActivities, setLoadedActivities] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);

            try {
                const response = await fetch("http://localhost:5000/api/activities");

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedActivities(responseData.activities);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    return (
    <React.Fragment>
        {!isLoading && loadedActivities && <ActivitiesList items={loadedActivities} />}
    </React.Fragment>
    );
}

export default Activities;