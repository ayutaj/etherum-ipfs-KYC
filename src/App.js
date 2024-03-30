import React, { useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loginpage from "./components/Loginpage";
import Dashboard from "./components/userComp/Dashboard";
import UserInfo from "./components/userComp/UserInfo";
import Status from "./components/userComp/Status";
import ApplyForKYC from "./components/userComp/ApplyForKYC";
import Register from "./components/Register";
import Bankdashboard from "./components/bankComp/Bankdashboard";
import Bankapplication from "./components/bankComp/Bankapplication";
import Web3 from "web3";
import Bankinfo from "./components/bankComp/Bankinfo";
import configuration from "./components/Kycsol.json";

// let contract, account;
// let provider = window.ethereum;
// const web3 = new Web3(provider);

// const connect = async () => {
//   if (typeof provider !== "undefined") {
//     console.log("heelo");
//     await provider.request({ method: "eth_requestAccounts" });
//     const accounts = await web3.eth.getAccounts();
//     account = accounts[0];
//     const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
//     const contractABI = configuration.abi;
//     contract = new web3.eth.Contract(contractABI, contractAddress);
//     console.log("connect successful----------------------");
//   } else {
//     console.log("Non-ethereum browser detected.Please install Metamask");
//   }
// };

// window.addEventListener("load", async () => {
//   connect();
//   console.log("on load login worked correctly");
// });

function App() {
  const [account, setaccount] = useState(null);
  const [contract, setcontract] = useState(null);

  useEffect(
    () => async () => {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      if (typeof provider !== "undefined") {
        console.log("heelo");
        await provider.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setaccount(accounts[0]);
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        const contractABI = configuration.abi;
        let tempcontract = new web3.eth.Contract(contractABI, contractAddress);
        setcontract(tempcontract);
        console.log("connect successful----------------------");
      } else {
        console.log("Non-ethereum browser detected.Please install Metamask");
      }
    },
    []
  );
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Loginpage account_prop={account} contract_prop={contract} />,
    },
    {
      path: "/dashboard",
      element: <Dashboard account_prop={account} contract_prop={contract} />,
    },

    {
      path: "/dashboard/userinfo",
      element: <UserInfo account_prop={account} contract_prop={contract} />,
    },
    {
      path: "/dashboard/status",
      element: <Status account_prop={account} contract_prop={contract} />,
    },
    {
      path: "/dashboard/apply_for_kyc",
      element: <ApplyForKYC account_prop={account} contract_prop={contract} />,
    },
    {
      path: "/register",
      element: <Register account_prop={account} contract_prop={contract} />,
    },
    {
      path: "/bankdashboard",
      element: (
        <Bankdashboard account_prop={account} contract_prop={contract} />
      ),
    },
    {
      path: "/bankinfo",
      element: <Bankinfo account_prop={account} contract_prop={contract} />,
    },
    {
      path: "/bankapplication",
      element: (
        <Bankapplication account_prop={account} contract_prop={contract} />
      ),
    },
  ]);

  console.log(`halala ${account} ${contract}`);
  return <RouterProvider router={router} />;
}

export default App;
