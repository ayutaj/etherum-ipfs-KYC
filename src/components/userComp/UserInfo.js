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
          let tempuserData = await contract.methods.mp_usermap(account).call();
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
          <div className="usrdiv">
            <div className="tp">
              <img src="/user_149071.png" alt="user" className="user-icon" />
              <h2>USER INFORMATION</h2>
            </div>
            <div className="user-infotp">
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
              <p>
                <strong className="tagtp">PERMANENT ADDRESS :</strong>{" "}
                {userData.permanentaddress.toUpperCase()}
              </p>
              <p>
                <strong className="tagtp">LOCAL ADDRESS :</strong>{" "}
                {userData.localaddress.toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
