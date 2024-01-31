import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [cookies, setCookies] = useCookies(["token"]);
  const handleEmail = async (e) => {
    setAdminEmail(e.target.value);
  };
  const handlePassword = async (e) => {
    setAdminPassword(e.target.value);
  };
  const handleData = async () => {
    try {
      const response = await fetch(
        "https://travel-and-tourism-apis.vercel.app/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminEmail, adminPassword }),
        }
      );

      const data = await response.json();
      if (data) {
        console.log(data);
        setCookies("token", data.token);
        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        // Handle login failure
        console.error(data.message);
        toast.error("Invalid credentials");
      }
      console.log(cookies);
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("Error occurred");
    }
  };
  const backgroundImageUrl = 'url("./LoginPic.jpg")';

  const containerStyle = {
    backgroundImage: backgroundImageUrl,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    margin: 0,
    display: "flex",
  };
  return (
    <div style={containerStyle}>
      <div className="container adminForm ">
        <h1 className="d-flex justify-content-center align-content-center">
          PlatFormIntl
        </h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={adminEmail}
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={adminPassword}
            onChange={handlePassword}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary d-flex justify-content-center align-content-center "
          style={{ width: "25vw", margin: "auto" }}
          onClick={handleData}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
