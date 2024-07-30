import React, { useContext } from "react";
import { TagsContext } from "../shared/context/tags-context";
import "./SingleTag.css";

const SingleTag = (props) => {
  const { tagsList, setTagsList } = useContext(TagsContext);

  const toggleTag = () => {
    setTagsList((oldTags) =>
      oldTags.includes(props.name)
        ? oldTags.filter((tagName) => tagName !== props.name)
        : [...oldTags, props.name]
    );
  };

  return (
    <React.Fragment>
      <div className="tag-box">
        <h3 className="tag-name">{props.name}</h3>
        <input
          id={props.id}
          className="tag-checkbox"
          type="checkbox"
          onChange={toggleTag}
        />
      </div>
    </React.Fragment>
  );
};

export default SingleTag;
