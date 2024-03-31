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
