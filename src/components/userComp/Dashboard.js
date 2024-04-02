import React from "react";
import LeftNav from "./LeftNav";
import "./cssFiles/Dashboard.css";
import "./cssFiles/LeftNav.css";
function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <LeftNav />
      <div className="right-content">
        <div className="dshtext-container">
          <div className="divdshleft">
            <p className="dshheading">A GLOBAL TURN-KEY COMPLIANCE SOLUTION</p>
            <p className="dshdashboard-text">
              An all-in-one workflow solution to verify your customers'
              identities, streamline a KYC on-boarding process and manage the
              entire customer lifecycle.
            </p>
          </div>
          <div className="divdshright">
            <div className="dshimage-container">
              <img
                src="/Dashboard.jpg"
                alt="Dashboard"
                className="dshdashboard-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
