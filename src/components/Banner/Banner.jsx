import React from "react";
import "./Banner.css";
import Carousel from "./Carousel.jsx";
const Banner = () => {
  return (
    <div className="banner">
      <div className="container">
        <h2 className="banner__title">Crypto Tracker</h2>
        <p className="banner__text">
          Get all the Info regarding your favorite Crypto Currency
        </p>
        <div className="banner__carousel">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Banner;
