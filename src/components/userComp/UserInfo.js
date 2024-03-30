import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import "./cssFiles/Userinfo.css";
import "./cssFiles/LeftNav.css";

const UserInfo = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const [userData, setUserData] = useState();
  useEffect(
    () => async () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          let tempuserData = await contract.methods
            .mp_usermap(account + "23")
            .call();
          setUserData(tempuserData);
        } catch (e) {
          console.log(e);
          alert("Check the connectivity of user metamask");
        }
      } else {
        console.log("Non-ethereum browser detected.Please install Metamask");
      }
    },
    [contract, account]
  );
  return (
    <div className="userinfo-container">
      <LeftNav />
      <div className="right-content">
        {!userData && <p>Loading........</p>}
        {userData && (
          <div>
            <div className="tp">
              <h2>USER INFORMATION</h2>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;

// const [update, setUpdate] = useState(0);
// const fetchData = async () => {
//   try {
//     const provider = window.ethereum;
//     // const web3 = new Web3(provider);
//     if (typeof provider !== "undefined") {
//       // await provider.request({ method: "eth_requestAccounts" });
//       // const accounts = await web3.eth.getAccounts();
//       // const account = accounts[0];
//       // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
//       // const contractABI = configuration.abi;
//       // contract = new web3.eth.Contract(contractABI, contractAddress);
//       // console.log("connect user successful");
//     } else {
//       console.log("Non-ethereum browser detected.Please install Metamask");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
