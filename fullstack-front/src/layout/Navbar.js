import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const logoutUser = () => {
    // Clear token from local storage
    localStorage.removeItem('jwtToken');
    console.clear();
    // Optionally, perform additional cleanup tasks or redirection
    // For example, redirect the user to the login page
    // navigate("/login");
  };

  // Define an array of page paths where the logout button should be hidden
  const hideLogoutOnPages = ["/", "/login"];

  // Check if the current location matches any of the pages where logout should be hidden
  const shouldHideLogout = hideLogoutOnPages.includes(location.pathname);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Full Stack Application
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {!shouldHideLogout && (
            <Link className="btn btn-outline-light" onClick={logoutUser} to="/login">
              Log Out
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}