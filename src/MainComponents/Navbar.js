import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Remove the 'token' cookie upon signout
    removeCookie("token");
    navigate("/");
  };
  return (
    <div>
      <header className="navbar navbar-dark  bg-dark flex-md-nowrap p-0 shadow fixed-top">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-4" to="/">
          Admin Panel
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <h3 className="logo form-control rounded-0 border-0">PlatFormINTL</h3>
        {/* <img
          src="./Dark.png"
          className="logo form-control form-control-dark 
           rounded-0 border-0 "
          alt="logo"
        /> */}
        {/* <input
          className="form-control form-control-light w-100 rounded-0 border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
        /> */}
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <button className="nav-link px-3" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
