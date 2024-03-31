// Showpassport.js
import React from "react";
import "./cssFiles/Showpassport.css";
const Showpassport = ({ data }) => {
  let idx = data.length - 4;
  return (
    <div className="passport-info">
      <div className="badadiv">
        <div>
          <h2>Passport Verification</h2>
          <p>
            ------------------------------------------------------------------------------------------------
          </p>
        </div>
        <div>
          <div className="paraps">
            <p>
              <strong>Name :</strong> {data[3]}
            </p>
            <p>
              <strong>Nationality:</strong> {data[4]}
            </p>
            <p>
              <strong>Date of Issue:</strong> {data[5]}
            </p>
            <p>
              <strong>Date of Expiry:</strong> {data[6]}
            </p>

            <p>
              <strong>Date of Birth:</strong> {data[7]}
            </p>
            <p>
              <strong>Bank: </strong> {data[2]}
            </p>
          </div>
          <div className="passportimage">
            <p>
              ------------------------------------------------------------------------------------------------
            </p>
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

export default Showpassport;
