import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); // Clear results if search query is empty
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/list?include_platform=false`
        );
        const filteredResults = response.data.filter((coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="w-11/12 md:w-9/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 pl-24  md:pl-24 relative left-28 md:left-28 ">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search By Coins"
            className=" w-full h-11 py-1 pl-10 pr-8 border rounded-md outline-none focus:border-black shadow-md "
            value={searchQuery}
            onChange={handleInputChange}
          />
          {searchResults.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 border rounded-md bg-white shadow-md">
              {searchResults.map((coin) => (
                <li
                  key={coin.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {coin.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
