import Header from "./components/Header";
import Navbar from "./components/Navbar";
import './App.css'
import CryptoChart from "./components/CryptoChart";

import CryptoPieChart from "./components/PieChart";
import CoinsExchange from "./components/CoinsExchange";

import CurrencySelector from "./components/CurrencySelector";

const cryptoData = [
  { name: "Bitcoin", value: 50, color: "#FF6384" },
  { name: "Ethereum", value: 25, color: "#36A2EB" },
  { name: "Cardano", value: 13, color: "#FFCE56" },
  { name: "Solana", value: 7, color: "#4CAF50" },
];

function App() {
  return (
    <>
    <div >
      <Navbar />
     
      <div className="flex ">
        <div className=" bg-slate">
        <Header />
        
        <CryptoChart />
       

      <div className="flex flex-row relative gap-7 bottom-8 left-7  top-10">
        <CryptoPieChart data={cryptoData} />
      
      <CoinsExchange/>
      </div>
      </div>
      <CurrencySelector/>
      </div>
      </div>

    </>
  );
}

export default App;
