import React from "react";
import "./PagArea.css";
import { useSearchParams } from "react-router-dom";

const PagArea = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const nextPageHandler = (event) => {
    event.preventDefault();
    const nextPage = currentPage + 1;
    setSearchParams((prev) => {
      prev.set("page", nextPage);
      return prev;
    });
  };

  const prevPageHandler = (event) => {
    event.preventDefault();
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setSearchParams((prev) => {
        prev.set("page", prevPage);
        return prev;
      });
    }
  };

  return (
    <React.Fragment>
      <div className="pagCtn">
        <div>
          <button className="pagBtn" onClick={prevPageHandler}>
            <h1>Back</h1>
          </button>
        </div>
        <div>
          <button className="pagBtn" onClick={nextPageHandler}>
            <h1>Next</h1>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PagArea;
