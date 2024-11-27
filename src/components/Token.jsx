import React, { useState, useEffect, useMemo, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { Options, Commonbases } from "../constant/index";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { getFormattedBalance } from "../integration"; // Update path if necessary

const Token = ({ closeDropdown, onSelectToken }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [balances, setBalances] = useState({});
  const { address: walletAddress, isConnected } = useAccount();

   const [tokensData, setTokensData] = useState([]);

   // Fetch GraphQL data
   const fetchGraphQLData = async () => {
     const url =
       "https://metisapi.0xgraph.xyz/api/public/067888d1-9438-4662-8f3e-4a65bbd440ba/subgraphs/cryptoalgebra/analytics-v1/v0.0.1/gn";
     const query = `
      query MyQuery {
        tokens {
          id
          symbol
          name
          decimals
          volumeUSD
          totalValueLockedUSD
          tokenDayData {
            priceUSD
            id
            date
          }
        }
      }
    `;

     try {
       const response = await fetch(url, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ query }),
       });

       const result = await response.json();
       console.log(result)

       // Process data: Convert date fields to readable format for all tokenDayData
       const processedData = result.data.tokens.map((token) => {
         const tokenDayData =
           token.tokenDayData?.map((dayData) => ({
             ...dayData,
             readableDate: dayData.date
               ? new Date(dayData.date * 1000).toLocaleString()
               : "No Date Available",
           })) || [];

         // Extract the last entry from tokenDayData
         const lastDayData = tokenDayData[tokenDayData.length - 1] || null;

         return { ...token, tokenDayData, lastDayData };
       });
         
       setTokensData(processedData);
     } catch (error) {
       console.error("Error fetching GraphQL data:", error);
     }
   };

   useEffect(() => {
     fetchGraphQLData();
   }, []);

  const filteredOptions = useMemo(
    () =>
      Options.filter((option) =>
        option.head.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const fetchTokenBalance = async (tokenAddress) => {
    try {
      if (!isConnected || !walletAddress || !tokenAddress) return "0";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        ["function balanceOf(address account) view returns (uint256)"],
        provider
      );
      const balance = await contract.balanceOf(walletAddress);
      return balance;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return "0";
    }
  };

  const fetchBalances = useCallback(async () => {
    if (!isConnected) {
      setBalances({});
      return;
    }

    const updatedBalances = {};
    await Promise.all(
      filteredOptions.map(async (option) => {
        const rawBalance = await fetchTokenBalance(option.address);
        const formattedBalance = await getFormattedBalance(
          option.address,
          rawBalance
        );

        updatedBalances[option.id] = formattedBalance;
        setBalances((prevBalances) => ({
          ...prevBalances,
          [option.id]: formattedBalance,
        }));
      })
    );
  }, [filteredOptions, isConnected, walletAddress]);
  // Sort the options to display tokens with balance > 0 first, followed by those with zero balances.
  const sortedOptions = [...filteredOptions].sort((a, b) => {
    const balanceA = parseFloat(balances[a.id] || "0");
    const balanceB = parseFloat(balances[b.id] || "0");

    // Prioritize tokens with a non-zero balance
    if (balanceA === 0 && balanceB !== 0) return 1;
    if (balanceB === 0 && balanceA !== 0) return -1;

    // Sort by descending balance for tokens with non-zero balances
    return balanceB - balanceA;
  });

  useEffect(() => {
    fetchBalances();
  }, [walletAddress, isConnected, searchTerm, fetchBalances]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black py-1 sm:py-2 ">
      <div className="bg-primaryBg rounded-3xl relative border border-[#222] w-full my-1 mx-2 sm:m-2 sm:w-[400px] h-fit">
        <div className="sticky top-0 bg-primaryBg z-10 px-2 p-1 sm:px-[1.5rem] sm:pt-[1rem] sm:pb-[.5rem] rounded-3xl">
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
            className="bg-inputBg border-none rounded-lg text-white focus:outline-none focus:ring-0 pb-1 w-full mt-1 sm:mt-4 placeholder:text-white placeholder:text-xs sm:placeholder:text-sm font-two sm:pb-2 px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto px-2 sm:px-[1.5rem] max-h-[calc(100vh-200px)]">
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

          <h1 className="text-white font-one text-sm sm:text-base font-medium sm:font-semibold text-left">
            Tokens list
          </h1>
          <div>
            {tokensData.length > 0 ? (
              sortedOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between hover:bg-inputBg rounded-2xl p-1 py-0.5 sm:py-3 my-1 cursor-pointer"
                  onClick={() =>
                    onSelectToken(
                      option.head,
                      option.address,
                      balances[option.id]
                    )
                  }
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
                    {balances[option.id] === "0.00000"
                      ? "0"
                      : balances[option.id]}
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

        <div className="sticky bottom-0 rounded-3xl bg-primaryBg z-10 px-2 py-1.5 sm:px-[1.5rem] sm:py-[1rem]">
          <button
            className="w-full bg-[#222222ad] hover:bg-inputBg text-white py-1 sm:py-2 font-one font-medium rounded-full text-sm sm:text-lg"
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
