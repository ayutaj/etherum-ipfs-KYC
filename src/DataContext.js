// import React, { createContext, useState, useEffect } from "react";
// import Web3 from "web3";
// import configuration from "./components/Kycsol.json";

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let contract, account;
//         let provider = window.ethereum;
//         if (typeof provider !== undefined) {
//           const web3 = new Web3(provider);
//           await provider.request({ method: "eth_requestAccounts" });
//           const accounts = await web3.eth.getAccounts();
//           account = accounts[0];
//           const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
//           const contractABI = configuration.abi;
//           contract = new web3.eth.Contract(contractABI, contractAddress);
//           console.log("connect successful");
//         } else {
//           console.log("Non-ethereum browser detected.Please install Metamask");
//         }

//         setData([account, contract]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
// };
