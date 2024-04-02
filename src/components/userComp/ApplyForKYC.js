import React, { useState, useEffect } from "react";
import LeftNav from "./LeftNav";
import "./cssFiles/Apply.css";
import "./cssFiles/LeftNav.css";
import Pancard from "./Pancard";
import Passport from "./Passport";

const ApplyForKYC = (props) => {
  const doctype = ["panCard", "passport"];
  const contract = props.contract_prop;
  const account = props.account_prop;
  const [selectedDoctype, setSelectedDoctype] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [userData, setUserData] = useState();
  const [banks, setBanks] = useState([]);
  useEffect(
    () => async () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          let tempuserData = await contract.methods.mp_usermap(account).call();
          const listBankaccount = await contract.methods.get_allbank().call();
          const banknamelist = [];
          for (let i = 0; i < listBankaccount.length; i++) {
            const bkname = await contract.methods
              .mp_bank_name(listBankaccount[i])
              .call();
            banknamelist.push(bkname);
          }

          setBanks(banknamelist);
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

  function handleDocChange(val) {
    setSelectedDoctype(val);
  }
  function handleBankChange(val) {
    setSelectedBank(val);
  }
  return (
    <div className="apply-container">
      <LeftNav />
      <div className="right-content">
        {!userData && (
          <div className="tppara">
            <p>Loading..................</p>
          </div>
        )}
        <div className="scrollable-content">
          {userData && (
            <div className="container_for_apply">
              <div>
                <div className="tph">
                  <h2>USER INFORMATION</h2>
                </div>
                <div className="user-infotptwo">
                  <p>
                    <strong className="tagtp">FIRST NAME :</strong>{" "}
                    {userData.fName.toUpperCase()}
                  </p>
                  <p>
                    <strong className="tagtp">LAST NAME :</strong>{" "}
                    {userData.lName.toUpperCase()}
                  </p>
                  <p>
                    <strong className="tagtp">FATHER'S NAME :</strong>{" "}
                    {userData.fathersName.toUpperCase()}
                  </p>
                  <p>
                    <strong className="tagtp">MOTHER'S NAME :</strong>{" "}
                    {userData.mothersName.toUpperCase()}
                  </p>
                  <p>
                    <strong className="tagtp">DATE OF BIRTH :</strong>{" "}
                    {userData.dob.toUpperCase()}
                  </p>
                  <p>
                    <strong className="tagtp">NATIONALITY :</strong>{" "}
                    {userData.nationality.toUpperCase()}
                  </p>
                  <p>
                    <strong className="tagtp">EMAIL :</strong>{" "}
                    {userData.email_address.toLowerCase()}
                  </p>

                  <p>
                    <strong className="tagtp">CONTACT NUMBER :</strong>{" "}
                    {userData.phoneNumber.toUpperCase()}
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
    </div>
  );
};

export default ApplyForKYC;
