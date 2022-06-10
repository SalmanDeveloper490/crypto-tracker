import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Exchanges.css";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalExchanges } from "../../config/api";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Exchanges = () => {
  const classes = useStyles();
  const [exchanges, setExchanges] = useState([]);
  const { theme, numberFormatter } = CryptoState();

  const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(GlobalExchanges());
      setExchanges(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("Exchanges", exchanges);

  useEffect(() => {
    fetchExchanges();
  }, []);

  return (
    <div>
      <div className={theme ? "dark" : "container"}>
        <h2 class="section__title">Exchanges</h2>
        <Grid container className={classes.root} spacing={2}>
          {exchanges &&
            exchanges.map((item) => (
              <Grid item xs={3} key={item.id}>
                <Card className="exchangeCard">
                  <CardActionArea>
                    <CardContent>
                      <div className="cardTitle">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="exchangeLogo"
                        />
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className="exchangeTitle"
                        >
                          {item.name}
                        </Typography>
                      </div>
                      <div className="exchangeDetail">
                        <p className="exchangeInfoText">
                          Rank : {item.trust_score_rank}
                        </p>
                        <p className="exchangeInfoText">
                          Country : {item.country}
                        </p>
                        <p className="exchangeInfoText">
                          Trade Volume 24h :{" "}
                          {numberFormatter(item.trade_volume_24h_btc)}
                        </p>
                        <p className="exchangeInfoText">
                          Trade Volume 24h Normalized :{" "}
                          {numberFormatter(
                            item.trade_volume_24h_btc_normalized
                          )}
                        </p>
                        <p className="exchangeInfoText">
                          Year's Established : {item.years_established}
                        </p>
                        <p className="exchangeInfoText">Url : {item.url}</p>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Exchanges;
