import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import millify from "millify";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  // console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coin/${coin.id}`}>
        <div className="carousel__wrapper">
          <img src={coin?.image} alt={coin?.name} className="carousel__image" />
          <span>
            {coin?.symbol}
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
        </div>
        <div className="carousel__price">
          <p className="price">
            {symbol} {millify(coin?.current_price)}
          </p>
        </div>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
    1200: {
      items: 4,
    },
  };

  return (
    <>
      <AliceCarousel
        mouseTracking
        infinite={true}
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay={true}
      />
    </>
  );
};

export default Carousel;
