import axios from "axios";
import React, { useEffect, useState } from "react";
import "./GlobalStats.css";
import { GlobalStats } from "../../config/api";
import millify from "millify";
import { CryptoState } from "../../CryptoContext";

const GloabalStats = () => {
  const [globalStats, setGlobalStats] = useState([]);
  const { numberFormatter } = CryptoState();
  const fetchGlobalStats = async () => {
    try {
      const { data } = await axios.get(GlobalStats());
      setGlobalStats(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(globalStats);

  useEffect(() => {
    fetchGlobalStats();
  }, []);
  return (
    <div className="global__stats">
      <h2 className="section__title">Global Crypto Stats</h2>
      <div className="global__stats__wrapper">
        <div className="inner_wrapper">
          <h3>Total Cryptocurrencies</h3>
          <p className="stats">
            {numberFormatter(globalStats?.active_cryptocurrencies)}
          </p>
        </div>
        <div className="inner_wrapper">
          <h3>Total Market Cap</h3>
          <p className="stats">
            {numberFormatter(globalStats?.total_market_cap?.btc)}
          </p>
        </div>
        <div className="inner_wrapper">
          <h3>Total Volume</h3>
          <p className="stats">
            {numberFormatter(globalStats?.total_volume?.btc)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GloabalStats;
