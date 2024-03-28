import React from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import Web3 from "web3";
import configuration from "./Kycsol.json";

let contract, account;
let provider = window.ethereum;
const web3 = new Web3(provider);

const connect = async () => {
  if (typeof provider !== "undefined") {
    await provider.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contractABI = configuration.abi;
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("connect successful");
  } else {
    console.log("Non-ethereum browser detected.Please install Metamask");
  }
};

window.addEventListener("load", async () => {
  connect();

  console.log("on load login worked correctly");
});

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const provider = window.ethereum;
    if (typeof provider !== "undefined") {
      try {
        let isuser = await contract.methods.mp_isUser(account).call();
        // console.log(isuser);
        isuser = Number(isuser);
        console.log(`Is user already present ${isuser}`);
        if (isuser) {
          navigate("/dashboard");
        } else {
          // navigate("/");
          navigate("/register");
        }
      } catch (e) {
        console.log(e);
        alert("Check the connectivity of metamask");
      }
    } else {
      console.log("Non-ethereum browser detected.Please install Metamask");
      alert("install metamask");
      return;
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <div className="login-content">
        <p>Login through Metamask</p>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;