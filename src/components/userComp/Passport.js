import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JSEncrypt } from "jsencrypt";
import "./cssFiles/Passport.css";
const Passport = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dateOfExpiry: "",
    dateOfIssue: "",
    nationality: "",
    dob: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
    } else {
      alert("Please upload an image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const acc_doc_bank_key =
      props.account_prop + ",passport," + props.bankname_prop;
    let isApplicationpresent = await props.contract_prop.methods
      .mp_account_doc_bank(acc_doc_bank_key)
      .call();
    isApplicationpresent = Number(isApplicationpresent);
    if (isApplicationpresent === 2) {
      alert(
        `You have already applied for the Passport for ${props.bankname_prop}. Please wait....`
      );
      return;
    }
    if (isApplicationpresent === 3) {
      alert(
        `Your KYC has been already completed for Passport for ${props.bankname_prop}`
      );
      return;
    }
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill ${key} field.`);
        return;
      }
    }
    const account = props.account_prop;

    const contract = props.contract_prop;
    const publicKeyuser = `-----BEGIN PUBLIC KEY-----${process.env.REACT_APP_PUBLIC_KEY}=-----END PUBLIC KEY-----`;
    const imgfile = formData.image;
    const modifieddata = new FormData();
    modifieddata.append("file", imgfile);
    setIsLoading(true);

    const resFile = await axios({
      method: "post",
      url: process.env.REACT_APP_PINATA_URL,
      data: modifieddata,
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
        "Content-Type": "multipart/form-data",
      },
    });
    const ipfsHash = resFile.data.IpfsHash;

    let dc = "passport";
    let datastring =
      account +
      "," +
      dc +
      "," +
      props.bankname_prop +
      "," +
      formData.name +
      "," +
      formData.nationality +
      "," +
      formData.dateOfIssue.toString() +
      "," +
      formData.dateOfExpiry.toString() +
      "," +
      formData.dob.toString();
    datastring = datastring + "," + ipfsHash;

    const encryptuser = new JSEncrypt();
    encryptuser.setPublicKey(publicKeyuser);
    const encrypted_hash_user = encryptuser.encrypt(datastring);

    let bank_publickey = await contract.methods
      .mp_public_bankKey(props.bankname_prop)
      .call();

    const encryptbank = new JSEncrypt();
    encryptbank.setPublicKey(bank_publickey);
    const encrypted_hash_bank = encryptbank.encrypt(datastring);

    let acc_doc_bank = account + "," + dc + "," + props.bankname_prop;
    await contract.methods
      .add_data_for_verification(
        account,
        encrypted_hash_user,
        encrypted_hash_bank,
        props.bankname_prop,
        acc_doc_bank,
        2
      )
      .send({ from: account });

    console.log(`encrypted_user_hash ${encrypted_hash_user}`);
    console.log(`encrypted_bank_hash ${encrypted_hash_bank}`);
    navigate("/dashboard");
    alert("uploaded_Succesfully");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className="loading-overlay"></div>}
      <div className={`${isLoading ? "blurred" : ""}`}>
        <div className="passport-form">
          <h2>Passport Application Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfIssue">Date of Issue:</label>
              <input
                type="date"
                id="dateOfIssue"
                name="dateOfIssue"
                value={formData.dateOfIssue}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfExpiry">Date of Expiry:</label>
              <input
                type="date"
                id="dateOfExpiry"
                name="dateOfExpiry"
                value={formData.dateOfExpiry}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button type="submit">Submit Passport Application</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Passport;
