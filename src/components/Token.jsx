import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { Options, Commonbases } from "../constant/index";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const Token = ({ closeDropdown, onSelectToken }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [balances, setBalances] = useState({});
  const { address: walletAddress, isConnected } = useAccount();
  const filteredOptions = Options.filter((option) =>
    option.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get the token balance
  const fetchTokenBalance = async (tokenAddress) => {
    try {
      if (!isConnected || !walletAddress || !tokenAddress) return "0";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        [
          // ERC20 ABI for balanceOf function
          "function balanceOf(address account) view returns (uint256)",
        ],
        provider
      );
      const balance = await contract.balanceOf(walletAddress);
      return parseFloat(ethers.utils.formatUnits(balance, 18)).toFixed(18);
    } catch (error) {
      console.error("Error fetching balance:", error);
      return "0";
    }
  };
  const formatBalance = (balance) => {
    const numBalance = parseFloat(balance);
    if (numBalance < 0.00001 && numBalance > 0) {
      return "<0.00001";
    }
    return numBalance.toFixed(5);
  };

  // Fetch balances for all tokens when component mounts or search changes
  useEffect(() => {
    const fetchBalances = async () => {
      if (!isConnected) {
        // Clear balances if wallet is not connected
        setBalances({});
        return;
      }

      const balancesPromises = filteredOptions.map(async (option) => {
        const balance = await fetchTokenBalance(option.address);
        return { [option.id]: balance };
      });
      const balancesArray = await Promise.all(balancesPromises);
      const balancesObject = balancesArray.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );
      setBalances(balancesObject);
    };

    fetchBalances();
  }, [filteredOptions, walletAddress, isConnected]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black py-1 sm:py-2 ">
      <div className="bg-primaryBg rounded-3xl relative border border-[#222] w-full my-1 mx-2 sm:m-2 sm:w-[400px] h-fit">
        {/* Header and Input - Fixed Top */}
        <div className="sticky top-0 bg-primaryBg z-10 px-2 p-1 sm:px-[1.5rem]  sm:pt-[1rem] sm:pb-[.5rem] rounded-3xl">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-semibold text-[14px] sm:text-[1.4rem] text-left font-one">
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
            className="bg-inputBg border-none rounded-lg text-white focus:outline-none focus:ring-0  pb-1 w-full mt-1 sm:mt-4 placeholder:text-white placeholder:text-xs sm:placeholder:text-sm font-two sm:pb-2 px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-2 sm:px-[1.5rem] max-h-[calc(100vh-200px)]">
          {/* Common Bases Section */}
          <div className="py-1 sm:py-2">
            <h1 className="text-white font-one text-sm sm:text-base font-medium sm:font-semibold text-left">
              Common bases
            </h1>

            <div className="flex flex-wrap gap-x-2 sm:gap-x-7 mt-1 sm:mt-3">
              {Commonbases.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center gap-2 hover:bg-inputBg rounded-full p-1 my-0.5 sm:my-1 cursor-pointer"
                  onClick={() => onSelectToken(token.head)}
                >
                  <img
                    src={token.image}
                    alt=""
                    className="h-[15px] sm:h-[24px] w-[15px] sm:w-[24px]"
                  />
                  <h6 className="text-white text-left font-medium sm:font-semibold font-one text-[10px] sm:text-xs">
                    {token.head}
                  </h6>
                </div>
              ))}
            </div>
          </div>

          {/* Tokens List Section */}
          <h1 className="text-white font-one text-sm sm:text-base font-medium sm:font-semibold text-left">
            Tokens list
          </h1>

          <div>
            {filteredOptions.length > 0 ? (
              filteredOptions
                .sort(
                  (a, b) =>
                    parseFloat(balances[b.id] || 0) -
                    parseFloat(balances[a.id] || 0)
                )
                .map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between hover:bg-inputBg rounded-2xl p-1 py-0.5 sm:py-3 my-1 cursor-pointer"
                    onClick={() => onSelectToken(option.head)}
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src={option.image}
                        alt=""
                        className="h-[17px] sm:h-[30px] w-[17px] sm:w-[30px] rounded-full items-center"
                      />
                      <div>
                        <h6 className="text-white text-left font-medium sm:font-semibold font-one text-[10px] sm:text-xs leading-4">
                          {option.head}
                        </h6>
                        <h6 className="font-one font-extralight text-[9px] sm:text-[13px] text-balanceText">
                          {option.desc}
                        </h6>
                      </div>
                    </div>
                    <h1 className="font-semibold text-xs sm:text-sm text-balanceText">
                      {parseFloat(balances[option.id]) === 0
                        ? "0"
                        : (isConnected && formatBalance(balances[option.id])) ||
                          "0"}
                    </h1>
                  </div>
                ))
            ) : (
              <div className="text-left font-two text-sm sm:text-lg text-white mt-1 sm:mt-4">
                No results found
              </div>
            )}
          </div>
        </div>

        {/* Cancel Button - Fixed Bottom */}
        <div className="sticky bottom-0 rounded-3xl bg-primaryBg z-10 px-2 py-1.5 sm:px-[1.5rem] sm:py-[1rem]">
          <button
            className="w-full bg-[#222222ad] hover:bg-inputBg text-white py-1 sm:py-2 font-one font-medium rounded-full text-base sm:text-lg"
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
