import React from "react";
import { Link } from "react-router-dom";
import { Select, MenuItem } from "@material-ui/core";
import "./Web.css";
import { CryptoState } from "../../../CryptoContext";
import UserSidebar from "../../UserSidebar/UserSidebar";

const Web = () => {
  const { theme, setTheme, currency, setCurrency, user } = CryptoState();
  // console.log("MODE", theme);
  return (
    <>
      <div className="web">
        <div className="web-menu-first">
          <Link to="/markets">Markets</Link>
          <Link to="/exchanges">Exchanges</Link>
        </div>
        <div className="web-menu-second">
          <Select
            variant="outlined"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="select__dropdown"
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
          {user ? (
            <UserSidebar />
          ) : (
            <>
              <Link to="/register">Sign Up</Link>
              <Link to="/login">Sign In</Link>
            </>
          )}
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
        </div>
      </div>
    </>
  );
};

export default Web;
