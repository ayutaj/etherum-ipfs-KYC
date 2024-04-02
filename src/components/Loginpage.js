import React from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";

const LoginPage = (props) => {
  const navigate = useNavigate();

  const contract = props.contract_prop;
  const account = props.account_prop;
  const handleadmin = () => {
    let isAdmin = account === "0xC43f6BA8e7e5A5f284B6665Fb40E60E051A1798D";

    if (isAdmin) {
      navigate("/admin");
    } else {
      alert("You are not admin");
      return;
    }
  };
  const handleLogin = async () => {
    const provider = window.ethereum;

    if (typeof provider !== "undefined") {
      try {
        console.log(account);
        let isuser = await contract.methods.mp_isUser(account).call();
        isuser = Number(isuser);
        console.log(`Is user already present ${isuser}`);
        if (isuser) {
          navigate("/dashboard");
        } else {
          let isbank = await contract.methods.mp_bank_name(account).call();
          console.log(`isbank ${isbank}`);
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
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-content">
          <p>Login through Metamask</p>
          <div className="logbutton">
            <button className="login-button" onClick={handleLogin}>
              User/Bank
            </button>
            <button className="login-button" onClick={handleadmin}>
              Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
