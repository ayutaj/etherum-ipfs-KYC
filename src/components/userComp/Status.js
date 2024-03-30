import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import "./cssFiles/Status.css";
import "./cssFiles/LeftNav.css";
const Status = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const [statusArray, setStatusArray] = useState([]);
  const [updateUI, setUpdateUI] = useState(0);
  useEffect(
    () => async () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          console.log(contract);
          let fetchedArray = await contract.methods
            .find_user_status(account + "23")
            .call();
          // const fetchedarray = solfetchedarray.toString();
          console.log(fetchedArray);
          for (let i = 0; i < fetchedArray.length; i = i + 1) {
            const st = await contract.methods
              .mp_account_doc_bank(fetchedArray[i])
              .call();
            console.log(`st : ${st}`);
            fetchedArray[i] = fetchedArray[i] + "," + st;
            console.log(fetchedArray[i]);
          }
          const stArray = fetchedArray.map((str) => str.split(","));
          setStatusArray(stArray);
          setUpdateUI(1);
          // setFinalArray(1);
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
    <div className="status-container">
      <LeftNav />
      <div className="right-content">
        {updateUI === 0 && (
          <div className="tppara">
            <p>Loading............</p>
          </div>
        )}
        <div className="scrollable-content">
          {updateUI === 1 && (
            <div className="inside">
              <h2>STATUS OF DOCUMENTS</h2>
              <h4>
                {statusArray.length === 0 && (
                  <p>You have not applied for any document</p>
                )}
              </h4>
              {statusArray.map((slab, index) => (
                <div key={index} className="slab">
                  <div className="slab-left">
                    <div>
                      <p>{slab[1].toUpperCase()}</p>
                    </div>
                    <div>
                      <p>{slab[2].toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="slab-right">
                    <div>
                      {slab[3] === "3" && <p className="green">APPROVED</p>}
                      {slab[3] === "2" && <p className="orange">PENDING</p>}
                      {slab[3] === "1" && <p className="red">REJECTED</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;
