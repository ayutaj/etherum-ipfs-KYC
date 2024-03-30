import React from "react";
import BankLeftNav from "./BankLeftNav";
import "./cssFiles/Bankdashboard.css";
import "./cssFiles/BankLeftNav.css";
function Bankdashboard(props) {
  // const account=props.account_prop;
  return (
    <div className="bankdashboard-container">
      <BankLeftNav />
      <div className="right-content">
        <p>This is bank user {props.account_prop}</p>
      </div>
    </div>
  );
}

export default Bankdashboard;
