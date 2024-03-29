import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loginpage from "./components/Loginpage";
import Dashboard from "./components/userComp/Dashboard";
import UserInfo from "./components/userComp/UserInfo";
import Status from "./components/userComp/Status";
import ApplyForKYC from "./components/userComp/ApplyForKYC";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Loginpage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/dashboard/userinfo",
    element: <UserInfo />,
  },
  {
    path: "/dashboard/status",
    element: <Status a={"aa"} />,
  },
  {
    path: "/dashboard/apply_for_kyc",
    element: <ApplyForKYC />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
