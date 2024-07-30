import React from "react";
import "./SideBar.css";
import "../../tag/TagList";
import TagList from "../../tag/TagList";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="title">
        <h1>Tags</h1>
      </div>
      <TagList />
    </div>
  );
};

export default SideBar;
