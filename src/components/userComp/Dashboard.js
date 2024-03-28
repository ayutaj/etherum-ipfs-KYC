import React from "react";
import LeftNav from "./LeftNav";
import "./Dashboard.css";

function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <LeftNav />
      <div className="right-content">
        <p>This is dashboard</p>
      </div>
    </div>
  );
}

export default Dashboard;
