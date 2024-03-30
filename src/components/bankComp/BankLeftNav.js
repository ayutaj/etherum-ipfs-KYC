import React from "react";
import { useNavigate } from "react-router-dom";
import "./cssFiles/BankLeftNav.css";

const LeftNav = () => {
  const navigate = useNavigate();

  const handleBank_Info = () => {
    navigate("/bankinfo");
  };

  const handleStatus = () => {
    navigate("/bankapplication");
  };

  const handleHome = () => {
    navigate("/bankdashboard");
  };
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="bankleft-nav">
      <div className="banktop-buttons">
        <button onClick={handleBank_Info}>Bank Info</button>
        <button onClick={handleStatus}>Application</button>
        <button onClick={handleHome}>Home</button>
      </div>
      <div className="bankdo">
        <button className="banklogout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftNav;
