import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CryptoChart = () => {
  const [currency, setCurrency] = useState("bitcoin");
  const [timeInterval, setTimeInterval] = useState("1d");
  const [priceData, setPriceData] = useState([]);
  const [chartType, setChartType] = useState("line");
  useEffect(() => {
    fetchData(currency, timeInterval);
  }, [currency, timeInterval]);
  const timeIntervals = [
    { value: "1d", label: "1D" },
    { value: "7d", label: "1W" },
    { value: "30d", label: "1M" },
    { value: "180d", label: "6M" },
    { value: "365d", label: "1Y" },
  ];

  const fetchData = (selectedCurrency, selectedTimeInterval) => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${selectedCurrency}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: selectedTimeInterval,
          },
        }
      )
      .then((response) => {
        const data = response.data.prices.map((entry) => ({
          date: new Date(entry[0]).toLocaleDateString(),
          price: entry[1],
        }));
        setPriceData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart
            data={priceData}
            
          >
           
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="rgb(75, 192, 192)"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );

      case "bar":
        return (
          <BarChart
            data={priceData}
           
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" /> <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="rgb(75, 192, 192)" />
          </BarChart>
        );

      case "area":
        return (
          <AreaChart
            data={priceData}
           
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis /> <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="price"
              fill="rgb(75, 192, 192)"
            />{" "}
          </AreaChart>
        );

      default:
        return null;
    }
  };

  return (
    <>
  <div className="border shadow-md relative   left-28  w-fit container md:w-100%  top-4 md:left-20">
      <div className="flex items-center  pr-40  space-x-6   ml-auto pb-2  gap-12 ">
  <div className="flex  mb-5  left-48 gap-5 relative ">
    {timeIntervals.map((interval) => (
      <button
        key={interval.value}
        onClick={() => setTimeInterval(interval.value)}
        className={`bg-slate-300 px-4 py-1  rounded-md ${
          timeInterval === interval.value ? "bg-blue-500" : "text-gray-700"
        }`}
      >
        {interval.label}
      </button>
    ))}
  </div>
  <div  className="flex relative items-center mb-9 pl-36 h-6 gap-5 my-4 w-80 sm:h-4 md:mb-0 md:w-80 sm:h-4">
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="ring-gray-200 focus:outline-none font-semibold bg-slate-300 px-5 py-2 sm:py-1 rounded-md"
    >
      <option value="bitcoin">Bitcoin</option>
      <option value="ethereum">Ethereum</option>
      <option value="binancecoin">Binance Coin</option>
      <option value="ripple">Ripple</option>
    </select>

    <select
      className="ring-gray-200 focus:outline-none font-semibold bg-slate-300 px-5 py-2 sm:py-1 rounded-md"
      value={chartType}
      onChange={(e) => setChartType(e.target.value)}
    >
      <option value="line">Line Chart</option>
      <option value="bar">Bar Chart</option>
      <option value="area">Area Chart</option>
    </select>
  </div>
</div>

      <div style={{ width: "97%", height: 261 }} className="relative  bottom-7     h-60">
      <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>
      </div>
    </>
  );
};
export default CryptoChart;