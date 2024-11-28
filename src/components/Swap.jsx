import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { RiArrowDropDownLine } from "react-icons/ri";
import musdc from "../assets/images/musdc.svg";
import metis from "../assets/images/metis.png";
import Token from "./Token";
import { Options } from "../constant/index"; // Ensure Options contains token data
import logo from "../assets/images/logo.svg";
import CustomButton from "./CustomButton";
import SwapContainer from "./SwapContainer";
import { GetApproval,GetOutAmount, ApproveToken, getFormattedBalance, getDecimal, getMaxBalance} from "../integration";
import { Tokens } from "../constant/index";
import tokenAbi from "../tokenabi.json";
import axios from "axios";


const Swap = () => {

 
  const [usdInputValue, setUsdInputValue] = useState("");
  const [usdOutputValue, setUsdOutputValue] = useState("");
  const [maxBalance, setMaxBalance] = useState(null);
  const [rawFromInput, setRawFromInput] = useState("");
  const [routeerror, setRouteerror] = useState(false);
  const [isDropdownOpenFrom, setIsDropdownOpenFrom] = useState(false);
  const [isDropdownOpenTo, setIsDropdownOpenTo] = useState(false);
  const [isMaxHovered, setIsMaxHovered] = useState(false);
  const [showTransactionSwap, setShowTransactionSwap] = useState(false); // State for TransactionSwap visibility
  const [inputBal, setInputBal] = useState(0.0);
  const [needApproval, setneedApproval] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [processingoutput, setProcessingOutput] = useState(false)
  const [selectedOptionFrom, setSelectedOptionFrom] = useState({
    name: "m.USDC",
    image: musdc,
    address: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
  });
  const [selectedOptionTo, setSelectedOptionTo] = useState({
    name: "METIS",
    image: metis,
    address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
  });
  const [inputValue, setInputValue] = useState("");
  const [ouputvalue, setOutputValue] = useState("");
  const [fromTokenBalance, setFromTokenBalance] = useState("0.00");
  const [toTokenBalance, setToTokenBalance] = useState("0.00");
  const { address: walletAddress, isConnected } = useAccount();
  const [tokensData, setTokensData] = useState({});

     useEffect(() => {
       // Fetch token data when component mounts
       axios
         .get("https://api.ultimatedigits.com/winks/proxy")
         .then((response) => {
           const tokens = response.data.data.tokens;
           setTokensData(tokens);
           console.log(tokens)
         })
         .catch((error) => {
           console.error("Error fetching data:", error.message);
         });
     }, []);

   useEffect(() => {
     // Recalculate USD values whenever inputValue or outputValue changes
     const calculateUsdValues = () => {
       // Calculate USD value for input
       if (selectedOptionFrom && tokensData && inputValue > 0) {
         const fromTokenData = tokensData[selectedOptionFrom.address];
         if (fromTokenData) {
           const tokenPriceInUSD = parseFloat(fromTokenData.price); // Price of from token in USD
           const tokenAmount = parseFloat(inputValue); // User input in token amount

           if (!isNaN(tokenPriceInUSD) && !isNaN(tokenAmount)) {
             const calculatedUsdValue = tokenPriceInUSD * tokenAmount;
             setUsdInputValue(
               calculatedUsdValue < 0.01
                 ? "<0.01"
                 : calculatedUsdValue.toFixed(2)
             );
           } else {
             setUsdInputValue("0"); // Fallback in case of invalid values
           }
         }
       }

       // Calculate USD value for output
       if (selectedOptionTo && tokensData && ouputvalue > 0) {
         const toTokenData = tokensData[selectedOptionTo.address];
         if (toTokenData) {
           const tokenPriceInUSD = parseFloat(toTokenData.price); // Price of to token in USD
           const tokenAmount = parseFloat(ouputvalue); // User output in token amount

           if (!isNaN(tokenPriceInUSD) && !isNaN(tokenAmount)) {
             const calculatedUsdValue = tokenPriceInUSD * tokenAmount;
             setUsdOutputValue(
               calculatedUsdValue < 0.01
                 ? "<0.01"
                 : calculatedUsdValue.toFixed(2)
             );
           } else {
             setUsdOutputValue("0"); // Fallback in case of invalid values
           }
         }
       }
     };

     calculateUsdValues();
   }, [
     inputValue,
     ouputvalue,
     selectedOptionFrom,
     selectedOptionTo,
     tokensData,
   ]);



  const fetchTokenBalance = async (tokenAddress) => {
    if (!walletAddress) return "0.00";

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        tokenAddress,
        ["function balanceOf(address owner) view returns (uint256)"],
        provider
      );

      const balance = await contract.balanceOf(walletAddress);
      return balance;
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      return "0.00";
    }
  };

  const getBalances = async () => {
    if (!isConnected) {
      setFromTokenBalance("0.00");
      setToTokenBalance("0.00");
      return;
    }

    try {
      // Fetch balances
      const fromBalance = await fetchTokenBalance(selectedOptionFrom.address);
      const toBalance = await fetchTokenBalance(selectedOptionTo.address);
      setRawFromInput(fromBalance);
      // Get decimals for each token
      const fromDecimals = await getFormattedBalance(
        selectedOptionFrom.address,
        fromBalance
      );
      const toDecimals = await getFormattedBalance(
        selectedOptionTo.address,
        toBalance
      );
      setInputBal(fromBalance);
      setFromTokenBalance(fromDecimals);
      setToTokenBalance(toDecimals);
    } catch (error) {
      console.error("Error fetching balances or decimals:", error);
      setFromTokenBalance("0.00");
      setToTokenBalance("0.00");
    }
  };

 useEffect(() => {
   if (isConnected && walletAddress) {
     getBalances();
   }

   const fetchOutAmount = async () => {
     try {
           setProcessingOutput(true); 

       const amountIn = inputValue; // Replace with your input value
       const tokenIn = selectedOptionFrom.address; // Replace with actual token address
       const tokenOut = selectedOptionTo.address; // Replace with actual token address

       console.log("Fetching Amount Out...");
       console.log("Input Amount:", amountIn);
       console.log("Token In Address:", tokenIn);
       console.log("Token Out Address:", tokenOut);

       // Provider
       const provider = window.ethereum
         ? new ethers.providers.Web3Provider(window.ethereum)
         : ethers.providers.getDefaultProvider();
       console.log("Provider:", provider);

       // Signer
       const signer = provider.getSigner();
       console.log("Signer:", signer);

       // Check tokenInDecimals
       const tokenInCon = new ethers.Contract(tokenIn, tokenAbi, signer);
       const tokenInDecimals = await tokenInCon.decimals();
       const inputValueDecimals = (amountIn.split(".")[1] || []).length;

       if (inputValueDecimals > tokenInDecimals) {
         console.error(
           "No route found: Input value exceeds token decimal places."
         );
         setProcessingOutput(false);
         setRouteerror(true); // Update state or handle the error accordingly
         return;
       }

       const amountOut = await GetOutAmount(amountIn, tokenIn, tokenOut);
       setRouteerror(false);
       if (amountOut !== null) {
         console.log("Fetched Amount Out:", amountOut);
         setOutputValue(amountOut);
         setProcessingOutput(false);
       } else {
         console.error("Amount out is null or undefined.");
         setProcessingOutput(false);
       }
     } catch (error) {
       console.error("Error in fetchOutAmount:", error);
       setProcessingOutput(false);
     }
   };

   // Interval logic
   const interval = setInterval(() => {
     if (isConnected && walletAddress) {
       fetchOutAmount();
     }
   }, 5000); // Fetch every 5 seconds

   // Cleanup interval on unmount or dependency change
   return () => clearInterval(interval);
 }, [
   isConnected,
   walletAddress,
   selectedOptionFrom,
   selectedOptionTo,
   inputValue,
 ]);



  const checkNetwork = async () => {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    console.log("provider", provider);
    const network = await provider.getNetwork();
    setCurrentNetwork(network.chainId);
    console.log("Connected to network:", network);
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  const toggleDropdownFrom = () => {
    setIsDropdownOpenFrom(!isDropdownOpenFrom);
    setIsDropdownOpenTo(false);
  };

  const toggleDropdownTo = () => {
    setIsDropdownOpenTo(!isDropdownOpenTo);
    setIsDropdownOpenFrom(false);
  };
  const handleOptionSelectFrom = (optionName) => {
    const selected = Options.find((opt) => opt.head === optionName);
    if (!selected) return;

    if (selected.head === selectedOptionTo.name) {
      setSelectedOptionTo(selectedOptionFrom);
      setSelectedOptionFrom({
        name: selected.head,
        image: selected.image,
        address: selected.address,
      });
    } else {
      setSelectedOptionFrom({
        name: selected.head,
        image: selected.image,
        address: selected.address,
      });
    }
    setIsDropdownOpenFrom(false);
  };

  const handleOptionSelectTo = (optionName) => {
    const selected = Options.find((opt) => opt.head === optionName);
    if (!selected) return;

    if (selected.head === selectedOptionFrom.name) {
      setSelectedOptionFrom(selectedOptionTo);
      setSelectedOptionTo({
        name: selected.head,
        image: selected.image,
        address: selected.address,
      });
    } else {
      setSelectedOptionTo({
        name: selected.head,
        image: selected.image,
        address: selected.address,
      });
    }
    setIsDropdownOpenTo(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpenFrom(false);
    setIsDropdownOpenTo(false);
  };

  const handleApproval = async () => {
    try {
      const res = await GetApproval(
        walletAddress,
        selectedOptionFrom.address,
        metis
      );

      console.log("res", res);
      if (res === "0") {
        setneedApproval(true);
      }
    } catch (error) {
      console.log("eerror in alloaef", error);
    }
  };
  const handleGetOut = async (validValue) => {
    try {
      const res = await GetOutAmount(
        validValue,
        selectedOptionFrom.address,
        selectedOptionTo.address
      );

      console.log("res", res);
    } catch (error) {
      console.log("eerror in get out", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9.]/g, "");
    if (validValue.split(".").length > 2) return;

    setInputValue(validValue);

    if (
      selectedOptionFrom.address !==
      "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
    ) {
      handleApproval();
    }
    if(validValue > 0){
    handleGetOut(validValue);
    setProcessingOutput(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "-") {
      e.preventDefault();
    }
  };

  const handleSwap = () => {
    const temp = selectedOptionFrom;
    setSelectedOptionFrom(selectedOptionTo);
    setSelectedOptionTo(temp);
  };

  

  // Handle showing the TransactionSwap component
  const handleShowTransactionSwap = () => {
    setShowTransactionSwap(true);
  };

  // Close the TransactionSwap component
  const handleCloseTransactionSwap = () => {
    setShowTransactionSwap(false);
  };

  const handleApproveToken = async () => {
    setIsProcessing(true); // Set processing state to true
    try {
      const tx = await ApproveToken(selectedOptionFrom.address);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction completed:", tx);
      setneedApproval(false); // Approval was successful
    } catch (error) {
      console.error("Error during token approval:", error);

      // If the error indicates the transaction was canceled by the user
      if (
        error.code === 4001 ||
        error.message.includes("User denied transaction")
      ) {
        setneedApproval(true);
      }
    } finally {
      setIsProcessing(false); // Set processing state back to false
    }
  };

 

  const fetchTokenPrice = (tokenAddress) => {
    const token = Tokens.find(
      (t) => t.address.toLowerCase() === tokenAddress.toLowerCase()
    );
    console.log("Token Price:", token?.price); // Check the retrieved price
    return token ? token.price : 0;
  };



    const isInsufficientBalance =
      parseFloat(inputValue) > parseFloat(maxBalance);
    // console.log(isInsufficientBalance, inputValue, MaxBalance);

     const handleMaxClick = () => {
    setInputValue(maxBalance);
     };

     useEffect(() => {
       const fetchBalance = async () => {
         if (selectedOptionFrom) {
           try {
             const balance = await getMaxBalance(selectedOptionFrom.address);
             setMaxBalance(balance); // Update state with the max balance
           } catch (error) {
             setError("Error fetching max balance."); // Handle any errors
           }
         }
       };

       fetchBalance();
     }, [selectedOptionFrom]); 

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black relative">
      <img
        src={logo}
        alt=""
        className="bg-black p-[5px] rounded-md h-[25px] sm:h-[50px] w-[60px] sm:w-[130px] mx-auto  sm:mb-2"
      />

      <div className=" p-3 sm:p-6 rounded-2xl shadow-md w-fit sm:w-[490px] md:w-[500px] bg-primaryBg">
        <div className="mb-3 sm:mb-7 flex justify-between items-center">
          <h1 className="text-start text-white text-lg sm:text-2xl font-semibold">
            Swap
          </h1>
          <CustomButton />
        </div>

        {/* First row */}
        <div className="flex gap-2 sm:gap-3">
          <div
            className="flex items-center w-[180px] sm:w-[220px] h-12 sm:h-20 px-1 sm:px-2 bg-inputBg hover:bg-[#181818] rounded-xl sm:rounded-3xl cursor-pointer"
            onClick={toggleDropdownFrom}
          >
            <img
              src={selectedOptionFrom.image}
              alt="Left icon"
              className="sm:w-10  w-7 sm:h-10 h-7 rounded-full object-cover mr-2"
            />
            <div>
              <div className="sm:text-sm text-[11px] font-medium text-two text-balanceText text-start">
                From
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold focus:outline-none text-[13px] sm:text-base">
                  {selectedOptionFrom.name}
                </div>
                <RiArrowDropDownLine className="text-gray-400 mt-1 w-7 h-5" />
              </div>
            </div>
          </div>

          {isDropdownOpenFrom && (
            <Token
              closeDropdown={closeDropdown}
              onSelectToken={handleOptionSelectFrom}
            />
          )}

          <div className="flex w-full p-1 sm:p-2 rounded-xl sm:rounded-3xl bg-inputBg">
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="0.0"
                className="text-white bg-inputBg text-xs px-2 sm:text-xl font-semibold p-1 sm:p-2 w-full focus:outline-none rounded-2xl placeholder:text-sm sm:placeholder:text-2xl"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                min={0}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <div className="flex justify-between">
                <div className="sm:text-xs text-[10px] text-balanceText text-start font-medium  px-1 sm:px-2">
                  Balance:{isConnected ? fromTokenBalance : "0.0"}
                </div>
                <div className="sm:text-xs text-[10px] text-white text-start font-normal  px-1  sm:px-2">
                  {usdInputValue && `$${usdInputValue}`}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handleMaxClick}
                onMouseDown={() => setIsMaxHovered(true)}
                onMouseUp={() => setIsMaxHovered(false)}
                onMouseLeave={() => setIsMaxHovered(false)}
                className={`bg-custom-gradient ${
                  isMaxHovered ? "text-white" : "text-black"
                } p-1 sm:p-2 items-center text-[10px] h-fit  sm:text-xs font-medium rounded-full`}
              >
                MAX
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSwap} // Show TransactionSwap on button click
          className={`hover:bg-notConnectedBg rounded-full p-1 sm:p-2 w-fit absolute left-[7.2rem] sm:left-[9.9rem] -mt-1 sm:-mt-2.5 ${
            isDropdownOpenFrom || isDropdownOpenTo ? "-z-50" : ""
          }`}
        >
          <svg
            viewBox="0 0 17 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="font-semibold sm:w-5 sm:h-5  w-3 h-3"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.70695 3.82828L9.70695 10.9141L11.707 10.9141L11.707 3.82828L14.9998 7.12117L16.4141 5.70695L10.7069 0L5.00003 5.70695L6.41425 7.12117L9.70695 3.82828Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.29289 17.2071L6.29289 10.9142L4.29289 10.9142L4.29289 17.2071L1 13.5858L0.585787 14.0001L6.29289 19.7071L11.0001 14.0001L10.5859 13.5858L6.29289 17.2071Z"
              fill="white"
            />
          </svg>
        </button>

        {/* Second row */}
        <div className="flex gap-2 sm:gap-3 mt-4">
          <div
            className="flex items-center w-[180px] sm:w-[220px] h-12 sm:h-20 px-1 sm:px-2 bg-inputBg hover:bg-[#181818] rounded-xl sm:rounded-3xl cursor-pointer"
            onClick={toggleDropdownTo}
          >
            <img
              src={selectedOptionTo.image}
              alt="Left icon"
              className="sm:w-10  w-7 sm:h-10 h-7 rounded-full object-cover mr-2"
            />
            <div>
              <div className="sm:text-sm text-[11px] font-medium text-two text-balanceText text-start">
                To
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold focus:outline-none text-[13px] sm:text-base">
                  {selectedOptionTo.name}
                </div>
                <RiArrowDropDownLine className="text-gray-400 mt-1 w-7 h-5" />
              </div>
            </div>
          </div>

          {isDropdownOpenTo && (
            <Token
              closeDropdown={closeDropdown}
              onSelectToken={handleOptionSelectTo}
            />
          )}

          <div className="flex w-full p-1 sm:p-2 rounded-xl sm:rounded-3xl bg-inputBg">
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="0.0"
                value={ouputvalue}
                className="text-[#696a6b] bg-inputBg text-xs px-2 sm:text-2xl font-semibold p-1 sm:p-2 w-full focus:outline-none rounded-xl placeholder:text-sm sm:placeholder:text-2xl"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                disabled
              />
              <div className="flex justify-between">
                {" "}
                <div className="sm:text-xs text-[10px] text-balanceText text-start font-medium  px-1 sm:px-2">
                  Balance: {isConnected ? toTokenBalance : "0.0"}
                </div>
                <div className="sm:text-xs text-[10px] text-white text-start font-normal  px-1 mr-10 sm:px-2">
                  {usdInputValue && `$${usdOutputValue}`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isInsufficientBalance && isConnected && (
          <div
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className="alert mt-3 mb-0 bg-[#ff353519] bg-opacity-50 text-[#ff3535] border-none font-normal px-6 text-[13px] text-left p-2 rounded-full"
          >
            Error: Insufficient Balance
          </div>
        )}

        {routeerror && isConnected && (
          <div
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className="alert mt-3 mb-0 bg-[#ff353519] bg-opacity-50 text-[#ff3535] border-none font-normal px-6 text-[13px] text-left p-2 rounded-full"
          >
            {"Error: No route found"}
          </div>
        )}
        {processingoutput && (
          <div class="flex items-center justify-center  py-2 text-[#696a6b]">
            <div role="status" class="spinner-border"></div>{" "}
            <span class="ms-2">Processing...</span>
          </div>
        )}
        <div className="flex flex-col gap-4 mt-5">
          {!isConnected && (
            <button className="text-[#696a6b] font-two bg-notConnectedBg w-full py-1 sm:p-3 rounded-xl font-semibold text-sm sm:text-lg mt-1">
              Not Connected
            </button>
          )}

          {isConnected &&
            (!isInsufficientBalance && inputValue > 0 ? (
              needApproval ? (
                <button
                  onMouseDown={() => setIsMaxHovered(true)}
                  onMouseUp={() => setIsMaxHovered(false)}
                  onMouseLeave={() => setIsMaxHovered(false)}
                  onClick={handleApproveToken}
                  disabled={isProcessing}
                  className={`text-black font-two cursor-pointer rounded-xl p-1 sm:p-2 text-sm sm:text-lg font-semibold text-center items-center ${
                    isProcessing ? "bg-notConnectedBg" : "bg-custom-gradient"
                  } ${isProcessing ? "text-white" : "text-black"} ${
                    isMaxHovered ? "text-white" : "text-black"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2 text-[#696a6b]">
                      <div role="status" className="spinner-border"></div>
                      Processing...
                    </div>
                  ) : (
                    selectedOptionFrom.address !==
                      "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000" &&
                    `Approve ${selectedOptionFrom.name}`
                  )}
                </button>
              ) : !routeerror && ouputvalue && !processingoutput ? (
                <button
                  onMouseDown={() => setIsMaxHovered(true)}
                  onMouseUp={() => setIsMaxHovered(false)}
                  onMouseLeave={() => setIsMaxHovered(false)}
                  className={`text-black bg-custom-gradient ${
                    isMaxHovered ? "text-white" : "text-black"
                  } font-two cursor-pointer bg-notConnectedBg rounded-xl p-1 sm:p-2 text-sm sm:text-lg font-semibold text-center items-center`}
                  onClick={() => setShowTransactionSwap(true)}
                >
                  Swap
                </button>
              ) : (
                <button className="text-[#696a6b] font-two bg-notConnectedBg w-full p-1 sm:p-2 text-sm sm:text-lg font-semibold mt-1 rounded-xl">
                  Swap
                </button>
              )
            ) : (
              <button className="text-[#696a6b] font-two bg-notConnectedBg w-full p-1 sm:p-2 text-sm sm:text-lg font-semibold mt-1 rounded-xl">
                Swap
              </button>
            ))}
        </div>
      </div>

      {showTransactionSwap && ( // Render TransactionSwap if visible
        <SwapContainer
          initialFromToken={selectedOptionFrom}
          initialToToken={selectedOptionTo}
          onClose={handleCloseTransactionSwap} // Pass close function
          inpVal={inputValue}
          outVal={ouputvalue}
          setIV={setInputValue}
          setOV={setOutputValue}
        />
      )}
      <p className="text-white text-sm sm:text-base font-medium text-center leading-5  sm:pt-2 font-two">
        Powered by Winks.fun
      </p>
    </div>
  );
};

export default Swap;
