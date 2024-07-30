import React, { useEffect, useState, useContext } from "react";
import ActivitiesList from "../components/ActivitiesList";
import "./Activities.css";
import { TagsContext } from "../../shared/context/tags-context";

const Activities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedActivities, setLoadedActivities] = useState();
  const { tagsList, setTagsList } = useContext(TagsContext);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const encodedTags = encodeURIComponent(
          tagsList.map((tag) => tag).join(",")
        );
        console.log(encodedTags);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/activities?tags=` + encodedTags
        );

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
  }, [tagsList]);

  return (
    <div className="activities-load-area">
      {!isLoading && loadedActivities && (
        <ActivitiesList items={loadedActivities} />
      )}
    </div>
  );
};

export default Activities;
