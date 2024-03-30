import React, { useEffect, useState } from "react";
import BankLeftNav from "./BankLeftNav";
import "./cssFiles/Bankinfo.css";
import "./cssFiles/BankLeftNav.css";

const Bankinfo = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const [userData, setUserData] = useState();
  useEffect(
    () => async () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          let tempuserData = await contract.methods
            .mp_accountBank(account)
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
    <div className="bankinfo-container">
      <BankLeftNav />
      <div className="right-content">
        {!userData && <p>Loading........</p>}
        {userData && (
          <div>
            <div className="tp">
              <h2>Bank INFORMATION</h2>
            </div>
            <div className="bank-info">
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Abbreivation:</strong> {userData.id}
              </p>
              <p>
                <strong>IFSC code:</strong> {userData.IFSC}
              </p>
              <p>
                <strong>Nationality:</strong> {userData.nationality}
              </p>
              <p>
                <strong>MICR code:</strong> {userData.MICR}
              </p>
              <p>
                <strong>District:</strong> {userData.district}
              </p>
              <p>
                <strong>Branch:</strong> {userData.branch}
              </p>
              <p>
                <strong>State:</strong> {userData.state}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bankinfo;
