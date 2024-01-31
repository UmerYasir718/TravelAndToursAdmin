import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky pt-3 sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/dashboard">
                <i className="bi bi-speedometer2 align-text-bottom"></i>{" "}
                Dashboard
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                <i className="bi bi-house-door-fill align-text-bottom"></i> Home
              </NavLink>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link">
                <span data-feather="file" className="align-text-bottom"></span>
                My Components
              </Link>
            </li>
            <li>
              <ul>
                <li>
                  <NavLink className="nav-link" to="/countries">
                    <span
                      data-feather="users"
                      className="align-text-bottom"
                    ></span>
                    Countries
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/route">
                    <span
                      data-feather="users"
                      className="align-text-bottom"
                    ></span>
                    Popular Routes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/carousel">
                    <span
                      data-feather="shopping-cart"
                      className="align-text-bottom"
                    ></span>
                    Carousel
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                <span
                  data-feather="bar-chart-2"
                  className="align-text-bottom"
                ></span>
                Appointment
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">
                <span
                  data-feather="layers"
                  className="align-text-bottom"
                ></span>
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}
