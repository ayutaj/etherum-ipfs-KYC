import React, { useEffect, useState } from "react";
import BankLeftNav from "./BankLeftNav";
import "./cssFiles/Bankapplication.css";
import "./cssFiles/BankLeftNav.css";
import Modal from "./Modal";
import { JSEncrypt } from "jsencrypt";

const Bankapplication = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const [statusArray, setStatusArray] = useState([]);
  const [updateUI, setUpdateUI] = useState(0);
  const [selectedSlab, setSelectedSlab] = useState(null);

  useEffect(
    () => async () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          let bankName = await contract.methods.mp_bank_name(account).call();
          let fetchedArray = await contract.methods
            .get_pending_applications_for_bank(bankName)
            .call();
          let decryptbank = new JSEncrypt();
          const private_bank_key = await contract.methods
            .mp_private_bankKey(bankName)
            .call();
          decryptbank.setPrivateKey(private_bank_key);
          let dec_arr = [];
          for (let i = 0; i < fetchedArray.length; i++) {
            let decrypted_hash = decryptbank.decrypt(fetchedArray[i]);
            dec_arr.push(decrypted_hash);
          }
          let newArray = [];
          let myset = new Set();
          for (let i = 0; i < dec_arr.length; i++) {
            const arr = dec_arr[i].split(",");
            const keystr = arr[0] + "," + arr[1] + "," + arr[2];

            if (!myset.has(keystr)) {
              let status = await contract.methods
                .mp_account_doc_bank(keystr)
                .call();
              status = Number(status);
              if (status === 2) {
                newArray.push(dec_arr[i] + "," + keystr);
              }
              myset.add(keystr);
            }
          }
          const new2darray = [];
          for (let i = 0; i < newArray.length; i++) {
            new2darray.push(newArray[i].split(","));
          }
          setStatusArray(new2darray);
          setUpdateUI(1);
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

  const handleSlabClick = (slabIndex) => {
    setSelectedSlab(statusArray[slabIndex]);
  };

  const handleCloseModal = () => {
    setStatusArray((prevStatusArray) =>
      prevStatusArray.filter((slab) => slab !== selectedSlab)
    );
    setSelectedSlab(null);
  };
  const handleCloseModalcut = () => {
    setSelectedSlab(null);
  };
  return (
    <div className="Bankapplication-container">
      <BankLeftNav />
      <div className="right-content">
        {updateUI === 0 && (
          <div className="tppara">
            <p>Loading............</p>
          </div>
        )}
        <div className="scrollable-content">
          {updateUI === 1 && (
            <div className="inside">
              <h2>PENDING APPLICATIONS</h2>
              <h4>
                {statusArray.length === 0 && (
                  <p>You have not pending Application to work upon</p>
                )}
              </h4>
              {statusArray.map((slab, index) => (
                <div
                  key={index}
                  className="slab"
                  onClick={() => handleSlabClick(index)}
                >
                  <div className="smallwrapper">
                    <div className="slab-tab somethingdifftwo">
                      <p className="somethingdiff">{index + 1}</p>
                    </div>
                  </div>
                  <div className="smallwrapper">
                    <div className="slab-tab">
                      <p>{`DOCUMENT   :   ${slab[1].toUpperCase()}`}</p>
                    </div>
                  </div>
                  <div className="smallwrapper">
                    <div className="slab-tab">
                      <p>{`BANK   :   ${slab[2].toUpperCase()}`}</p>
                    </div>
                  </div>
                  <div className="smallwrapper">
                    <div className="slab-tab">
                      <p>{`NAME   :   ${slab[3].toUpperCase()}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedSlab && (
        <Modal
          isOpen={!!selectedSlab}
          onClose={handleCloseModal}
          data={selectedSlab}
          account={account}
          contract={contract}
          handleCloseModalcut={handleCloseModalcut}
        />
      )}
    </div>
  );
};

export default Bankapplication;
