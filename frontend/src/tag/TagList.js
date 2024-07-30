import React, { useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import "./SingleTag";
import SingleTag from "./SingleTag";

const TagList = () => {
  const { sendRequest } = useHttpClient();
  const [allTags, setAllTags] = useState({ tags: [] });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsList = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tags`
        );
        setAllTags(tagsList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTags();
  }, []);

  if (allTags.tags.length === 0) {
    return (
      <React.Fragment>
        <h1>No tags found</h1>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {allTags.tags.map((tag) => {
          return <SingleTag name={tag.name} id={tag._id} />;
        })}
      </React.Fragment>
    );
  }
};

export default TagList;
