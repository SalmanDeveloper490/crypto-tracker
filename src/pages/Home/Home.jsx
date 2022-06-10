import React from "react";
import "./Home.css";
import Banner from "../../components/Banner/Banner";
import Coins from "../../components/Coins/Coins";
import GloabalStats from "../../components/GlobalStats/GloabalStats";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";

const Home = () => {
  const { theme } = CryptoState();
  // console.log("MODE", theme);

  return (
    <>
      <Banner />
      <div className={theme ? "dark" : "container"}>
        <GloabalStats />
        <div className="pt-80">
          <Coins simplified title="Market Trend" />
        </div>
        <Link to="/markets" className="coins__link">
          View More Markets &nbsp;&nbsp;→
        </Link>
      </div>
    </>
  );
};

export default Home;
