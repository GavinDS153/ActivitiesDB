import React, { useState } from "react";
import "./SearchArea.css";
import { useSearchParams } from "react-router-dom";
import { ActQueryContext } from "../../shared/context/act-query-context";

const SearchArea = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState({ searchTerm: "" });

  const handleInputChange = (event) => {
    const { value } = event.target; // Gets the value of the input field
    setFormData((prev) => ({
      ...prev,
      searchTerm: value,
    }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Change query params
    const searchQuery = encodeURIComponent(formData.searchTerm);
    setSearchParams((prev) => {
      prev.set("search", searchQuery);
      return prev;
    });
  };

  return (
    <React.Fragment>
      <div className="search-area">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            placeholder="Search..."
            className="searchInput"
            onChange={handleInputChange}
          />
          <button className="searchButton" type="submit">
            Filter
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SearchArea;
