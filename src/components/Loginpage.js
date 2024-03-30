import React from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import Tp from "./userComp/Tp";

const LoginPage = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const navigate = useNavigate();
  const handleLogin = async () => {
    const provider = window.ethereum;
    console.log(typeof provider);
    if (typeof provider !== "undefined") {
      try {
        console.log(account);
        let isuser = await contract.methods.mp_isUser(account).call();
        isuser = Number(isuser);
        console.log(isuser);
        console.log(`Is user already present ${isuser}`);
        if (isuser) {
          navigate("/dashboard");
        } else {
          let isbank = await contract.methods.mp_bank_name(account).call();
          if (isbank.length > 0) {
            navigate("/bankdashboard");
          } else {
            navigate("/register");
          }
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
    <>
      <Tp></Tp>
      <div className="login-container">
        <h1>Login Page</h1>
        <div className="login-content">
          <p>Login through Metamask</p>
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

// import Web3 from "web3";
// import configuration from "./Kycsol.json";

// let provider = window.ethereum;
// const web3 = new Web3(provider);

// const connect = async () => {
//   if (typeof provider !== "undefined") {
//     console.log("heelo");
//     await provider.request({ method: "eth_requestAccounts" });
//     const accounts = await web3.eth.getAccounts();
//     console.log("heelo2");

//     account = accounts[0];
//     const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
//     const contractABI = configuration.abi;
//     contract = new web3.eth.Contract(contractABI, contractAddress);
//     console.log("connect successful");
//   } else {
//     console.log("Non-ethereum browser detected.Please install Metamask");
//   }
// };

// window.addEventListener("load", async () => {
//   connect();

//   console.log("on load login worked correctly");
// });
