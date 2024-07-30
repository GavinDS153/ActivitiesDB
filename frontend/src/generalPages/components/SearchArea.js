import React from "react";
import "./SearchArea.css";

const SearchArea = () => {
  return (
    <React.Fragment>
      <div className="search-area">
        <input placeholder="Search..." className="searchInput" />
        <button className="searchButton">Filter</button>
      </div>
    </React.Fragment>
  );
};

export default SearchArea;
