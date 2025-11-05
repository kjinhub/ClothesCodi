import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/icons/codi-logo.svg";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Codi AI Logo" className="navbar-logo" />
        <Link to="/" className="navbar-title">
          Codi AI
        </Link>
      </div>
      <div className="navbar-right">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
          홈
        </Link>
        <Link
          to="/wardrobe"
          className={`nav-link ${
            location.pathname === "/wardrobe" ? "active" : ""
          }`}>
          내 옷장
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
