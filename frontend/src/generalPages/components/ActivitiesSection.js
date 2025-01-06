import React, { useState } from "react";
import SearchArea from "./SearchArea";
import Activities from "../../activity/pages/Activities";
import SideBar from "./SideBar";
import "./ActivitiesSection.css";
import { ActQueryContext } from "../../shared/context/act-query-context";

const ActivitiesSection = () => {
  const [tagsList, setTagsList] = useState([]); // Will be passed down in context
  // Allows children to see the tagsList value and set the value through the setTagsList function also being passed down

  return (
    <ActQueryContext.Provider value={{ tagsList, setTagsList }}>
      <div className="grid-act-parent">
        <SearchArea />
        <SideBar />
        <Activities />
      </div>
    </ActQueryContext.Provider>
  );
};

export default ActivitiesSection;
