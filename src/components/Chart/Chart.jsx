import axios from "axios";
import "./Chart.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { HistoricalChart } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../config/data";

const Chart = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setChartData(data.prices);
  };
  //   console.log(chartData);

  const data = {
    labels: chartData?.map((coin) => {
      const date = new Date(coin[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: chartData?.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#EEBC1D",
      },
    ],
  };

  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);
  return (
    <div>
      <Line data={data} options={options} />
      <div className="chart__buttons">
        {chartDays.map((day) => (
          <button
            onClick={() => setDays(day.value)}
            className={day.value === days ? "active" : ""}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
