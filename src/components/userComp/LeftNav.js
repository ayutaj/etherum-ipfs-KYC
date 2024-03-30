import React from "react";
import { useNavigate } from "react-router-dom";
import "./cssFiles/LeftNav.css";

const LeftNav = () => {
  const navigate = useNavigate();

  const handleUser_Info = () => {
    navigate("/dashboard/userinfo");
  };

  const handleStatus = () => {
    navigate("/dashboard/status");
  };

  const handleApply = () => {
    navigate("/dashboard/apply_for_kyc");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="left-nav">
      <div className="top-buttons">
        <button onClick={handleUser_Info}>User Info</button>
        <button onClick={handleStatus}>Status</button>
        <button onClick={handleApply}>Apply</button>
        <button onClick={handleHome}>Home</button>
      </div>
      <div className="do">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftNav;
