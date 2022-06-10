import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <p>
          © Copyright {new Date().getFullYear()} <strong>Crypto Tracker</strong>
        </p>
      </footer>
    </>
  );
};

export default Footer;
