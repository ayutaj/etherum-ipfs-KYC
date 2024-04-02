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
          <div className="usrdiv ekaurdiv">
            <div className="tp bktppp">
              <img src="/pngbank.png" alt="bank" className="user-icon us2" />
              <h2>Bank INFORMATION</h2>
            </div>
            <div className="user-infotp ekaurnaam">
              <p>
                <strong className="tagtp">NAME :</strong>{" "}
                {userData.name.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">ABBREVATION :</strong>{" "}
                {userData.id.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">IFSC CODE :</strong>{" "}
                {userData.IFSC.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">MICR CODE :</strong>{" "}
                {userData.MICR.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">NATIONALITY :</strong>{" "}
                {userData.nationality.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">STATE :</strong>{" "}
                {userData.state.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">DISTRICT :</strong>{" "}
                {userData.district.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">BRANCH :</strong>{" "}
                {userData.branch.toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bankinfo;
