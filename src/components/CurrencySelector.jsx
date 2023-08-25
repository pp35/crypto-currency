import React, { useState } from 'react';
import SideBar from './SideBar';// Update the path

const CurrencySelector = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd'); // Default currency is USD

  return (
    <>


    <div className="absolute  left-24 max-w-97px ml-5 rounded-md outline-none  border  focus:border-black shadow-md">
     
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)} className='h-10 w-20'
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
      </div >
   
      <SideBar selectedCurrency={selectedCurrency}   />
   
      
    </>
  );
};

export default CurrencySelector;

