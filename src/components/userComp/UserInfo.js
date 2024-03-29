import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LeftNav from "./LeftNav";
import "./Userinfo.css";

import Web3 from "web3";
import configuration from "./Kycsol.json";

let userData;
const UserInfo = () => {
  // const navigate = useNavigate();
  const [update, setUpdate] = useState(0);
  const fetchData = async () => {
    try {
      const provider = window.ethereum;
      const web3 = new Web3(provider);
      if (typeof provider !== "undefined") {
        await provider.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contractABI = configuration.abi;
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("connect user successful");
        try {
          userData = await contract.methods.mp_usermap(account).call();
          setUpdate(1);
        } catch (e) {
          console.log(e);
          alert("Check the connectivity of user metamask");
        }
      } else {
        console.log("Non-ethereum browser detected.Please install Metamask");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="userinfo-container">
      <LeftNav />
      <div className="right-content">
        {update === 0 && <button onClick={fetchData}>show info</button>}
        {update === 1 && userData && (
          <div className="user-info">
            <h2>User Information</h2>
            <p>
              <strong>First Name:</strong> {userData.fName}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.lName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {userData.dob}
            </p>
            <p>
              <strong>Nationality:</strong> {userData.nationality}
            </p>
            <p>
              <strong>Email Address:</strong> {userData.email_address}
            </p>

            <p>
              <strong>fathersName:</strong> {userData.fathersName}
            </p>
            <p>
              <strong>mothersName:</strong> {userData.mothersName}
            </p>
            <p>
              <strong>phoneNumber:</strong> {userData.phoneNumber}
            </p>
            <p>
              <strong>permanentaddress:</strong> {userData.permanentaddress}
            </p>
            <p>
              <strong>localaddress:</strong> {userData.localaddress}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
