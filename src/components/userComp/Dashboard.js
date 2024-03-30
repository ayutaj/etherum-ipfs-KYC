import React from "react";
import LeftNav from "./LeftNav";
import "./cssFiles/Dashboard.css";
import "./cssFiles/LeftNav.css";
function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <LeftNav />
      <div className="right-content">
        <p>This is dashboard {props.account_prop}</p>
      </div>
    </div>
  );
}

export default Dashboard;
