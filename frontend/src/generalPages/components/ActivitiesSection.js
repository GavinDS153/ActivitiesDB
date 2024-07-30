import React, { useState } from "react";
import SearchArea from "./SearchArea";
import Activities from "../../activity/pages/Activities";
import SideBar from "./SideBar";
import "./ActivitiesSection.css";
import { TagsContext } from "../../shared/context/tags-context";

const ActivitiesSection = () => {
  const [tagsList, setTagsList] = useState([]); // Will be passed down in context
  // Allows children to see the tagsList value and set the value through the setTagsList function also being passed down

  return (
    <TagsContext.Provider value={{ tagsList, setTagsList }}>
      <div className="grid-act-parent">
        <SearchArea />
        <SideBar />
        <Activities />
      </div>
    </TagsContext.Provider>
  );
};

export default ActivitiesSection;
