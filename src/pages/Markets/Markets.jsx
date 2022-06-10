import React from "react";
import "./Markets.css";
import Coins from "../../components/Coins/Coins";
import { CryptoState } from "../../CryptoContext";

const Markets = () => {
  const { theme } = CryptoState();

  return (
    <div>
      <div className={theme ? "dark" : "container"}>
        <h2 className="section__title">Markets</h2>
        <Coins />
      </div>
    </div>
  );
};

export default Markets;
