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
  //get_pending_applications_for_bank
  useEffect(
    () => async () => {
      let provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          let bankName = await contract.methods.mp_bank_name(account).call();
          let fetchedArray = await contract.methods
            .get_pending_applications_for_bank(bankName)
            .call();
          // const fetchedarray = solfetchedarray.toString();
          //   console.log(fetchedArray);
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
          const newArray = [];
          for (let i = 0; i < dec_arr.length; i++) {
            const arr = dec_arr[i].split(",");
            const keystr = arr[0] + "," + arr[1] + "," + arr[2];
            console.log(`keystr ${keystr}`);
            let status = await contract.methods
              .mp_account_doc_bank(keystr)
              .call();
            status = Number(status);
            console.log(status);
            if (status === 2) {
              newArray.push(dec_arr[i] + "," + keystr);
            }
          }
          console.log(newArray);
          const new2darray = [];
          for (let i = 0; i < newArray.length; i++) {
            new2darray.push(newArray[i].split(","));
          }
          console.log("yee");
          console.log(new2darray);
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
              <h2>STATUS OF DOCUMENTS</h2>
              <h4>
                {statusArray.length === 0 && (
                  <p>You have not applied for any document</p>
                )}
              </h4>
              {statusArray.map((slab, index) => (
                <div
                  key={index}
                  className="slab"
                  onClick={() => handleSlabClick(index)}
                >
                  <div className="slab-tabs">
                    <div className="slab-tab">{slab[1]}</div>
                    <div className="slab-tab">{slab[2]}</div>
                    <div className="slab-tab">{slab[3]}</div>
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
          documentType={selectedSlab[1]}
        />
      )}
    </div>
  );
};

// {
//   statusArray.map((slab, index) => (
//     <div key={index} className="slab">
//       <div className="slab-left">
//         <div>
//           <p>{slab[1].toUpperCase()}</p>
//         </div>
//         <div>
//           <p>{slab[2].toUpperCase()}</p>
//         </div>
//       </div>
//       <div className="slab-right">
//         <div>
//           {slab[3] === "3" && <p className="green">APPROVED</p>}
//           {slab[3] === "2" && <p className="orange">PENDING</p>}
//           {slab[3] === "1" && <p className="red">REJECTED</p>}
//         </div>
//       </div>
//     </div>
//   ));
// }
export default Bankapplication;
