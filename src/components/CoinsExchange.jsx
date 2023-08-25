
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CoinsExchange = () => {
  const exchangeRates = useSelector(state => state.exchangeRates);

  const [crypto1, setCrypto1] = useState('bitcoin');
  const [crypto2, setCrypto2] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [comparisonResult, setComparisonResult] = useState('');

  const handleCrypto1Change = event => {
    setCrypto1(event.target.value);
  };

  const handleCrypto2Change = event => {
    setCrypto2(event.target.value);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleCompare = () => {
    
    const rate1Sell = exchangeRates[crypto1].sell;
    const rate2Buy = exchangeRates[crypto2].buy;
   

    if (!isNaN(amount)) {
      const result1 = amount * (rate1Sell / rate2Buy);
      
      setComparisonResult(`
      
      ${result1.toFixed(2)}
      
      
      `);
    } else {
      setComparisonResult('Invalid input');
    }
  };

  return (
    <div className="container shadow-md border rounded-md flex-none  w-fit   h-56   ">
      <h2 className='text-green-500 text-xl font-bold ml-4'>Exchange Coins</h2>
      <label htmlFor="crypto1" className='relative top-6 font-bold text-orange-500 ml-5'>Sell</label>
      <select id="crypto1" value={crypto1} className='relative top-6 left-8 shadow-md rounded-md border-solid bg-white border-radius  h-9 w-36' onChange={handleCrypto1Change}>
        {Object.keys(exchangeRates).map(crypto => (
          <option key={crypto} value={crypto}>
            {crypto}
          </option>
        ))}
      </select>
<br />
      <label htmlFor="crypto2" className='relative top-8 font-bold text-teal-600 ml-5'>Buy</label>
      <select id="crypto2" value={crypto2} className='relative top-8 left-8 shadow-md rounded-md border-solid   mr-72 bg-white border-radius h-9  w-36 ' onChange={handleCrypto2Change}>
        {Object.keys(exchangeRates).map(crypto => (
          <option key={crypto} value={crypto}>
            {crypto}
          </option>
        ))}
      </select>
<br />
      <label htmlFor="amount" className='relative bottom-20 bold  left-72 '>Enter value :</label> <br />
      <input
        type="number"
        id="amount"
        placeholder="Enter amount"
        className='relative bottom-20 left-64 shadow-md rounded-md border-solid bg-white border-radius mr-2 h-12 w-26 mt-2  pl-3'
        value={amount}
        onChange={handleAmountChange}
      />

      <button id="compare" className=' relative top-8 right-9 left-9 shadow-md rounded-md border-solid bg-blue-400 border-radius h-9 w-28 ' onClick={handleCompare}>
       Exchange 
      </button>

      <div id="comparison-result" className='relative left-56 bottom-14 font-bold'>{comparisonResult}</div>
    </div>
  );
};

export default CoinsExchange













