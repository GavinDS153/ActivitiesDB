import React from "react";

const ActSingle = (props) => {
  return (
    <React.Fragment>
      <h1>{props.name}</h1>
      <h3>{props.org}</h3>
    </React.Fragment>
  );
};

export default ActSingle;
