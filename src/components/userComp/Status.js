import React from "react";
import LeftNav from "./LeftNav";
import "./Status.css";

const Status = (props) => {
  return (
    <div className="status-container">
      <LeftNav />
      <div className="right-content">
        <p>This is Status {props.a}</p>
      </div>
    </div>
  );
};

export default Status;
