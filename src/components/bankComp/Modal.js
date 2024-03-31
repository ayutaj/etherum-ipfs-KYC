import React, { useState } from "react";
import "./cssFiles/Modal.css";
import Showpancard from "./Showpancard";
import Showpassport from "./Showpassport";

const Modal = ({
  isOpen,
  onClose,
  data,
  account,
  contract,
  handleCloseModalcut,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const acc_dcoc_bank =
    data[data.length - 3] +
    "," +
    data[data.length - 2] +
    "," +
    data[data.length - 1];
  console.log("key : ");
  console.log(acc_dcoc_bank);
  const handleclick = async (val) => {
    const provider = window.ethereum;
    console.log(contract);
    if (typeof provider !== "undefined") {
      try {
        setIsLoading(true);
        await contract.methods
          .alter_account_doc_bank(acc_dcoc_bank, val)
          .send({ from: account });
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert("Check the connectivity of user metamask");
      }
    } else {
      console.log("Non-ethereum browser detected.Please install Metamask");
    }
    alert("status updated");
    onClose();
  };
  return (
    <>
      {isLoading && <div className="loading-overlay"></div>}
      {isOpen && (
        <div className={`${isLoading ? "blurred" : ""}`}>
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="cut-button" onClick={handleCloseModalcut}>
                X
              </button>
              <div className="upper">
                {data[1] === "pancard" && (
                  <div>
                    <Showpancard
                      data={data}
                      account={account}
                      contract={contract}
                    />
                  </div>
                )}
                {data[1] === "passport" && (
                  <div>
                    <Showpassport
                      data={data}
                      account={account}
                      contract={contract}
                    />
                  </div>
                )}
              </div>
              <div className="button-container">
                <button
                  onClick={() => {
                    handleclick(1);
                  }}
                  className="reject"
                >
                  REJECT
                </button>
                <button
                  onClick={() => {
                    handleclick(3);
                  }}
                >
                  APPROVE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
