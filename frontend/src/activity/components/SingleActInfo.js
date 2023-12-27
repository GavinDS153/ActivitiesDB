import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import "./SingleActInfo.css";

const SingleActInfo = () => {
    let location = useLocation();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedActivity, setLoadedActivity] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);

            try {
                const response = await fetch("http://localhost:5000/api/activities" + location.pathname);

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedActivity(responseData.activity);
                console.log(loadedActivity.name);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    return (
        !isLoading && loadedActivity && 
        <React.Fragment>
            <div className="singleActBlock">
                <h1 className="actName">{loadedActivity.name}</h1>
                <p>{loadedActivity.desc}</p>
            </div>
        </React.Fragment>
    );
}

export default SingleActInfo;