import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Coins.css";
import { useNavigate } from "react-router-dom";
import millify from "millify";
import { CryptoState } from "../../CryptoContext";
import { CoinList } from "../../config/api";

const Coins = ({ simplified, title }) => {
  let navigate = useNavigate();
  const count = simplified ? 10 : 100;
  //   console.log(count);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency, count));
    const filteredData = data.filter((coin) =>
      coin.name.toLowerCase().includes(search)
    );
    // console.log(filteredData);
    setCoins(filteredData);
  };
  //   console.log(coins);
  // console.log(search);
  useEffect(() => {
    fetchCoins();
  }, [search]);

  return (
    <div className="coins">
      <h3 className="section__title">{title}</h3>
      {!simplified && (
        <div className="coins__search__input">
          <input
            type="text"
            placeholder="Search Coin Name"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24H Change</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            let profit = coin?.price_change_percentage_24h >= 0;
            return (
              <>
                <tr onClick={() => navigate(`/coin/${coin?.id}`)} key={coin.id}>
                  <td>{coin?.market_cap_rank}</td>
                  <td className="first__td">
                    <img src={coin?.image} alt={coin?.name} height="80px" />
                    <span>{coin?.name}</span>
                  </td>
                  <td>
                    {symbol}
                    {millify(coin?.current_price)}
                  </td>
                  <td>{millify(coin?.market_cap)}</td>
                  <td>
                    <span
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Coins;
