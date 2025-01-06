import React, { useEffect, useState, useContext } from "react";
import ActivitiesList from "../components/ActivitiesList";
import "./Activities.css";
import { ActQueryContext } from "../../shared/context/act-query-context";
import { useSearchParams } from "react-router-dom";

const Activities = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedActivities, setLoadedActivities] = useState();
  const { tagsList, setTagsList } = useContext(ActQueryContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentLimit = parseInt(searchParams.get("limit")) || 2;
  const searchValue = searchParams.get("search") || "";

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const encodedTags = encodeURIComponent(
          tagsList.map((tag) => tag).join(",")
        );
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/activities` +
            "?tags=" +
            encodedTags +
            "&page=" +
            currentPage +
            "&limit=" +
            currentLimit +
            "&search=" +
            searchValue
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
  }, [tagsList, searchValue, currentPage, currentLimit]);

  return (
    <div className="activities-load-area">
      {!isLoading && loadedActivities && (
        <ActivitiesList items={loadedActivities} />
      )}
    </div>
  );
};

export default Activities;
