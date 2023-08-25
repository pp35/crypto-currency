import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SideBar = ({ selectedCurrency }) => {
  const [cryptoList, setCryptoList] = useState([]);

  const fetchCryptoData = (currency) => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: 200,
          page: 1,
        },
      })
      .then((response) => {
        setCryptoList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchCryptoData(selectedCurrency);
  }, [selectedCurrency]);

  const formatCurrency = (value, currency) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    });
    return formatter.format(value);
  };

  return (
   <>
   
   <div className='border max-w-md  w-96 mx-auto shadow-md border-r-1 border-gray-300 relative container md:max-w-xl'>
  <div className="crypto-sidebar max-80 border-r-1 p-4 container border shadow-md border-r-1 border-gray-300 md:flex scroll-my-1">
    <h1 className='font-bold relative rounded-md h-9  shadow-md pt-1 pl-11  left-1  w-84 right-3 border-gray-300 bottom-2'>Top Cryptocurrencies by Market Cap</h1>
    <div className="crypto-list">
      {cryptoList.map((crypto) => (
        <div key={crypto.id} className="crypto-item flex items-center mb-3">
          <div className="crypto-logo w-10 h-10 mr-3 ml-1">
            <img src={crypto.image} alt={crypto.name} />
          </div>
          <div className="crypto-info m-0">
            <p>{crypto.name}</p>
            <p>Mkt.Cap {formatCurrency(crypto.market_cap, selectedCurrency)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

</>
  );
};

export default SideBar;
