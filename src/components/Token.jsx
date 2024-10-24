import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { Options, Commonbases } from "../constant/index";
import getWalletDetails from '../integration'; // Import your getWalletDetails function

const Token = ({ closeDropdown, onSelectToken }) => {
  const [searchTerm, setSearchTerm] = useState("");
   const [walletAddress, setWalletAddress] = useState(null);
   const [balances, setBalances] = useState({});

   useEffect(() => {
     const fetchWalletDetails = async () => {
       const { walletAddress, balances } = await getWalletDetails();
       setWalletAddress(walletAddress);
       setBalances(balances);
     };

     fetchWalletDetails();
   }, []);

  // Filter tokens based on the search term
  const filteredOptions = Options.filter((option) =>
    option.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black py-2 ">
      <div className="bg-primaryBg rounded-3xl relative border border-[#222] w-full m-2 sm:w-[400px] h-fit">
        {/* Header and Input - Fixed Top */}
        <div className="sticky top-0 bg-primaryBg z-10 px-[1.5rem] pt-[1rem] pb-[.5rem] rounded-3xl">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold text-[1.4rem] text-left font-one">
              Select a token
            </h1>
            
            <IoIosClose
              size={28}
              className="hover:text-white text-notConnectedText mt-1 items-center cursor-pointer"
              onClick={closeDropdown}
            />
          </div>
          <input
            type="text"
            placeholder="Search by name or address"
            className="bg-inputBg border-none rounded-lg text-white focus:outline-none focus:ring-0 p-1 w-full mt-4 placeholder:text-white placeholder:text-sm font-two pb-2 px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-[1.5rem] max-h-[calc(100vh-200px)]">
          {/* Common Bases Section */}
          <div className="py-2">
            <h1 className="text-white font-one font-semibold text-left">
              Common bases
            </h1>

            <div className="flex flex-wrap gap-x-7 mt-3">
              {Commonbases.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center gap-2 hover:bg-inputBg rounded-full p-1 my-1 cursor-pointer"
                  onClick={() => onSelectToken(token.head)}
                >
                  <img src={token.image} alt="" className="h-[24px] w-[24px]" />
                  <h6 className="text-white text-left font-semibold font-one text-xs">
                    {token.head}
                  </h6>
                </div>
              ))}
            </div>
          </div>

          {/* Tokens List Section */}
          <h1 className="text-white font-one font-semibold text-left my-2">
            Tokens list
          </h1>

          <div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between hover:bg-inputBg rounded-2xl p-1 py-3 my-1 cursor-pointer"
                  onClick={() => onSelectToken(option.head)}
                >
                  <div className="flex gap-2">
                    <img
                      src={option.image}
                      alt=""
                      className="h-[30px] w-[30px] rounded-full"
                    />
                    <div>
                      <h6 className="text-white text-left font-semibold font-one text-xs leading-4">
                        {option.head}
                      </h6>
                      <h6 className="font-one font-extralight text-[13px] text-balanceText">
                        {option.desc}
                      </h6>
                    </div>
                  </div>

                  <h1 className="font-semibold text-sm text-balanceText hover:bg-inputBg">
                    0
                  </h1>
                </div>
              ))
            ) : (
              <div className="text-left font-two text-white mt-4">
                No results found
              </div>
            )}
          </div>
        </div>

        {/* Cancel Button - Fixed Bottom */}
        <div className="sticky bottom-0 rounded-3xl bg-primaryBg z-10 px-[1.5rem] py-[1rem]">
          <button
            className="w-full bg-[#222222ad] hover:bg-inputBg text-white py-2 font-one font-medium rounded-full"
            onClick={closeDropdown}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Token;
