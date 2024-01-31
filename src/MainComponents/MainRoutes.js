import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashBoard from "../MyComponents/DashBoard";
import ManageAppointment from "../MyComponents/ManageAppointment";
import ManageCarousels from "../MyComponents/ManageCarousels";
import ManageCountries from "../MyComponents/ManageCountries";
import ManagePopularRoutes from "../MyComponents/ManagePopularRoutes";
import Login from "./Login";
export default function MainRoutes() {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    const verifyToken = async () => {
      // console.log(cookies.token);
      try {
        const response = await fetch(
          "https://travel-and-tourism-apis.vercel.app/verify",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const errorData = await response.json();
          console.error("Token verification failed:", errorData.message);
          // Redirect to login or handle unauthorized access
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
        // Redirect to login or handle unauthorized access
      }
    };

    verifyToken();
  }, [cookies.token]);
  return (
    <>
      {" "}
      {user ? (
        <Router>
          <Routes basename="/">
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<DashBoard />} />
            {/* <Route path="/home" element={<AdminHome />} /> */}
            <Route path="/countries" element={<ManageCountries />} />
            <Route path="/route" element={<ManagePopularRoutes />} />
            <Route path="/carousel" element={<ManageCarousels />} />
            <Route path="/contact" element={<ManageAppointment />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Login />
        </Router>
      )}
    </>
  );
}
