import React from "react";
import Nav from "./Nav";

const Base = ({
  title = "",
  // description = "My desription",
  // className = "container-fluid mt-4",
  children,
}) => (
  <div>
    <Nav />
    <div className="row">
      <div className="col s12">
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  </div>
);

export default Base;
