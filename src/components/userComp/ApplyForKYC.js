import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LeftNav from "./LeftNav";
import "./Apply.css";
import Pancard from "./Pancard";
import Passport from "./Passport";

import Web3 from "web3";
import configuration from "./Kycsol.json";

let userData, account, contract;
const banks = ["State Bank of India", "Bank of India"];
const doctype = ["panCard", "passport"];
const ApplyForKYC = () => {
  // const navigate = useNavigate();
  const [updatebtn, setUpdatebtn] = useState(0);
  const [selectedDoctype, setSelectedDoctype] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const fetchapply = async () => {
    try {
      const provider = window.ethereum;
      const web3 = new Web3(provider);
      if (typeof provider !== "undefined") {
        await provider.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contractABI = configuration.abi;
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("connect apply successful");
        try {
          userData = await contract.methods.mp_usermap(account).call();
          setUpdatebtn(1);
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

  function handleDocChange(val) {
    setSelectedDoctype(val);
    console.log(`yp ${val}`);
  }
  function handleBankChange(val) {
    setSelectedBank(val);
    console.log(`yp ${val}`);
  }
  return (
    <div className="apply-container">
      <LeftNav />
      <div className="right-content">
        {updatebtn === 0 && <button onClick={fetchapply}>Apply</button>}
        {updatebtn === 1 && userData && (
          <div className="container_for_apply">
            <div>
              <div className="tp">
                <h2>User Information</h2>
              </div>
              <div className="user-info">
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
                  <strong>phoneNumber:</strong> {userData.phoneNumber}
                </p>
              </div>
            </div>
            <div className="applyForm">
              <div className="dropdowns">
                <select
                  value={selectedDoctype}
                  onChange={(e) => {
                    handleDocChange(e.target.value);
                  }}
                >
                  <option value="">Select Document Type</option>
                  {doctype.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedBank}
                  onChange={(e) => {
                    handleBankChange(e.target.value);
                  }}
                >
                  <option value="">Select Bank</option>
                  {banks.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <div className="forms">
                {selectedDoctype === "panCard" && (
                  <Pancard
                    contract_prop={contract}
                    account_prop={account}
                    bankname_prop={selectedBank}
                  />
                )}
                {selectedDoctype === "passport" && (
                  <Passport
                    contract_prop={contract}
                    account_prop={account}
                    bankname_prop={selectedBank}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyForKYC;
