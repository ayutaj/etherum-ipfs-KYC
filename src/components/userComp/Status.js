import React from "react";
import LeftNav from "./LeftNav";
import "./Status.css";

const Status = () => {
  return (
    <div className="status-container">
      <LeftNav />
      <div className="right-content">
        <p>This is Status</p>
      </div>
    </div>
  );
};

export default Status;
