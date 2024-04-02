import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import forge from "node-forge";

const Admin = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ids: "",
    IFSC: "",
    account_in: "",
    MICR: "",
    branch: "",
    district: "",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill ${key} field.`);
        return;
      }
    }
    try {
      const Keygenerator = () => {
        const rsa = forge.pki.rsa;
        const keys = rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
        let publicKeyPEM = forge.pki.publicKeyToPem(keys.publicKey);
        let privateKeyPEM = forge.pki.privateKeyToPem(keys.privateKey);
        publicKeyPEM = publicKeyPEM.toString();
        privateKeyPEM = privateKeyPEM.toString();
        console.log(`pubkey for bank ${publicKeyPEM}`);
        console.log(`private key for bank${privateKeyPEM}`);
        return [publicKeyPEM, privateKeyPEM];
      };
      const [publicKey, privateKey] = Keygenerator();

      const provider = window.ethereum;
      if (typeof provider !== "undefined") {
        try {
          setIsLoading(true);
          await contract.methods
            .add_bank(
              formData.name,
              formData.ids,
              formData.IFSC,
              "Inida",
              formData.account_in,
              formData.MICR,
              publicKey,
              privateKey,
              formData.district,
              formData.branch,
              formData.state
            )
            .send({ from: account });
          setIsLoading(false);
          alert("bank added succesfully");
          navigate("/");
        } catch (e) {
          navigate("/");
        }
      } else {
        alert("provider is not etherum");
      }
    } catch (e) {
      navigate("/");
      alert("Error while adding bank, please try again.");
      console.log(e);
    }
  };

  return (
    <>
      {isLoading && <div className="loading-overlay"></div>}
      <div className={`${isLoading ? "blurred" : ""}`}>
        <div className="admin-container">
          <h2>Fill the details of bank</h2>
          <div className="admin-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Bank Name :</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label htmlFor="ids">Abbrevation :</label>
                <input
                  type="text"
                  id="ids"
                  name="ids"
                  value={formData.ids}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="IFSC">IFSC Code :</label>
                <input
                  type="text"
                  id="IFSC"
                  name="IFSC"
                  value={formData.IFSC}
                  onChange={handleInputChange}
                />
                <label htmlFor="MICR">MICR code :</label>
                <input
                  type="text"
                  id="MICR"
                  name="MICR"
                  value={formData.MICR}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="account_in">Sepolia Account :</label>
                <input
                  type="text"
                  id="account_in"
                  name="account_in"
                  value={formData.account_in}
                  onChange={handleInputChange}
                />
                <label htmlFor="branch">Branch :</label>
                <input
                  type="text"
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="district">District :</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                />
                <label htmlFor="state">State :</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <button className="admin-button" type="submit">
                Add Bank
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
