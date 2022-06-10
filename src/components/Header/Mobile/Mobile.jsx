import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../../../CryptoContext";
import "./Mobile.css";

const Mobile = ({ isOpen, setIsOpen }) => {
  const { theme, setTheme } = CryptoState();

  return (
    <>
      <div className="mobile">
        <div className="close-icon" onClick={() => setIsOpen(!isOpen)}>
          <i className="fi-rr-cross-circle cancel-icon"></i>
        </div>
        <div className="mobile-links">
          <div className="theme-toggle">
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => setTheme(!theme)}
                checked={theme ? "checked" : ""}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <ul className="mobile-list">
            <li>
              <Link to="/markets">Markets</Link>
            </li>
            <li>
              <Link to="/exchanges">Exchanges</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Mobile;
