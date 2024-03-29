import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import "./Status.css";

const Status = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const [finalArray, setFinalArray] = useState();
  useEffect(
    () => async () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          // const temp2darray = [];
          let solfetchedarray = await contract.methods.bankList().call();
          const fetchedarray = solfetchedarray.toString();
          console.log(fetchedarray);
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
        <p>status</p>
      </div>
    </div>
  );
};

export default Status;
