import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Chart from "../../components/Chart/Chart";
import { SingleCoin } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import "./CoinDetails.css";
import ReactHtmlParser from "react-html-parser";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CoinDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const [coin, setCoin] = useState();
  const { theme, user, currency, symbol, numberFormatter, watchlist } =
    CryptoState();

  const fetchCoinDetails = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  // console.log(coin);

  useEffect(() => {
    fetchCoinDetails();
  }, [id]);

  // WATCHLIST
  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      toast(`${coin.name} Added to the Watchlist !`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "colored",
      });
    } catch (error) {
      toast("OOPS ! Something Went Wrong", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      toast(`${coin.name} Removed from the Watchlist !`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    } catch (error) {
      toast("OOPS ! Something Went Wrong", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
  };

  let profit = coin?.market_data?.price_change_24h >= 0;
  // console.log(profit);

  return (
    <div className="coin__details">
      <div className={theme ? "dark" : "container"}>
        <div className="wrapper">
          <div className="sidebar">
            <div className="coin__image__name__wrapper">
              <div className="title__wrapper">
                <img src={coin?.image?.large} alt={coin?.name} />
                <h3 className="coin__name">{coin?.name}</h3>
              </div>
              <div className="button__wrapper">
                {user && (
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                      height: 40,
                      backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                    }}
                    onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                  >
                    {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  </Button>
                )}
              </div>
            </div>
            <p className="description">
              {ReactHtmlParser(coin?.description?.en)}
            </p>
            <div className="market__data">
              <h5>Rank: {coin?.market_cap_rank}</h5>
              <h5>
                Price: {symbol}{" "}
                {numberFormatter(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </h5>
              <h5>
                Market Cap: {symbol}{" "}
                {numberFormatter(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                )}
              </h5>
              <h5>
                Market Cap 24H Change: {""}
                <span
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"}
                  {coin?.market_data?.price_change_24h.toFixed(2)}%
                </span>
              </h5>
            </div>
          </div>
          <div className="chart">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
