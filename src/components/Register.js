import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Web3 from "web3";
import configuration from "./Kycsol.json";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    emailAddress: "",
    account: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all fields are filled
    try {
      if (
        formData.firstName &&
        formData.lastName &&
        formData.dob &&
        formData.nationality &&
        formData.emailAddress
      ) {
        const provider = window.ethereum;

        if (typeof provider !== "undefined") {
          const web3 = new Web3(provider);
          await provider.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          const fname = formData.firstName.toLowerCase();
          const lname = formData.lastName.toLowerCase();
          const dob = formData.dob.toString().toLowerCase();
          const nationality = formData.nationality.toLowerCase();
          const emailAddress = formData.emailAddress.toLowerCase();
          // console.log(dob);
          // console.log(account);
          // console.log(typeof dob);
          // console.log(typeof account);
          const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
          const contractABI = configuration.abi;
          // console.log(contractAddress);
          // console.log(contractABI);
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          try {
            console.log(accounts[0]);
            console.log(4);
            await contract.methods
              .add_user(fname, lname, dob, nationality, emailAddress, account)
              .send({ from: account });
            console.log(5);
            let isuser = await contract.methods.mp_isUser(account).call();
            console.log(isuser);
            isuser = Number(isuser);
            if (isuser === 0) {
              navigate("/register");
            } else {
              navigate("/dashboard");
            }

            navigate("/dashboard");
          } catch (e) {
            navigate("/register");
          }
        } else {
          alert("Please fill all fields!");
        }
      } else {
        alert("save me");
      }
    } catch (e) {
      navigate("/register");
      alert("error while registering please try again ");
      console.log(e);
    }
  };

  return (
    <div className="register-container">
      <h1>Register Page</h1>
      <div className="register-content">
        <p>
          Looks like you are not registered, fill the below form to get started
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
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
            <label htmlFor="emailAddress">Email Address:</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
            />
          </div>
          <button className="register-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
