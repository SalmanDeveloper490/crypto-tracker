import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import "./Header.css";
import Mobile from "./Mobile/Mobile";
import Web from "./Web/Web";
import UserSidebar from "../UserSidebar/UserSidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = CryptoState();

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Crypto Tracker</Link>
      </div>
      <div className="menu">
        <Web />
        <div className="mobile-menu">
          <div className="mobile__user">{user ? <UserSidebar /> : <></>}</div>
          <div onClick={() => setIsOpen(!isOpen)}>
            <i className="fi-rr-apps menu-icon"></i>
          </div>
          {isOpen && <Mobile isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
