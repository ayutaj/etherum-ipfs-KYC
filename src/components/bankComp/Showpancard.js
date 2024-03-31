// Showpancard.js
import React from "react";
import "./cssFiles/Showpancard.css";
const Showpancard = ({ data }) => {
  let idx = data.length - 4;
  return (
    <div className="pancard-info">
      <div className="badadiv">
        <div>
          <h2>Pancard Verification</h2>
          <p>
            ------------------------------------------------------------------------------------------------
          </p>
        </div>
        <div>
          <div className="para">
            <p>
              <strong>Name :</strong> {data[3]}
            </p>
            <p>
              <strong>Father's Name:</strong> {data[4]}
            </p>
            <p>
              <strong>PAN Number:</strong> {data[5]}
            </p>
            <p>
              <strong>Date of Birth:</strong> {data[6]}
            </p>
            <p>
              <strong>Bank: </strong> {data[2]}
            </p>
            <p>
              ------------------------------------------------------------------------------------------------
            </p>
          </div>
          <div className="panimage">
            <img
              src={`https://gateway.pinata.cloud/ipfs/${data[idx]}`}
              alt="Document"
              width="600"
              height="400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showpancard;
