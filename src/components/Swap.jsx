import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { RiArrowDropDownLine } from "react-icons/ri";
import musdc from "../assets/images/musdc.svg";
import metis from "../assets/images/vmetis.png";
import Token from "./Token";
import { Options } from "../constant/index"; // Ensure Options contains token data
import logo from "../assets/images/logo.svg";
import CustomButton from "./CustomButton";
import SwapContainer from "./SwapContainer";
import { GetApproval, getOutAmount, ApproveToken} from "../integration";


const Swap = () => {
  const [amountOut, setAmountOut] = useState(null);
 const [isDropdownOpenFrom, setIsDropdownOpenFrom] = useState(false);
 const [isDropdownOpenTo, setIsDropdownOpenTo] = useState(false);
 const [isMaxHovered, setIsMaxHovered] = useState(false);
 const [showTransactionSwap, setShowTransactionSwap] = useState(false); // State for TransactionSwap visibility
 const [inputBal, setInputBal] = useState(0.0)
 const [needApproval, setneedApproval] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false);
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
 const [ouputvalue, setOutputValue] = useState("0.00000000000001")
 const [fromTokenBalance, setFromTokenBalance] = useState("0.00");
 const [toTokenBalance, setToTokenBalance] = useState("0.00");
 const { address: walletAddress, isConnected } = useAccount();

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
     return ethers.utils.formatUnits(balance, 18);
   } catch (error) {
     console.error("Failed to fetch balance:", error);
     return "0.00";
   }
 };

const formatBalance = (balance) => {
  const numBalance = parseFloat(balance);
  if (numBalance < 0.00001 && numBalance > 0) {
    return "<0.00001";
  }
  return numBalance.toFixed(5);
};

const getBalances = async () => {
  if (!isConnected) {
    setFromTokenBalance("0.00");
    setToTokenBalance("0.00");
    return;
  }

  const fromBalance = await fetchTokenBalance(selectedOptionFrom.address);
  const toBalance = await fetchTokenBalance(selectedOptionTo.address);
  setInputBal(fromBalance)
  setFromTokenBalance(formatBalance(fromBalance));
  setToTokenBalance(formatBalance(toBalance));
};
 useEffect(() => {
   if (isConnected && walletAddress) {
     getBalances();
   }
   const fetchOutAmount = async () => {
     const amountIn = "1236876826492874920000000000000"; // Replace with your input value
     const tokenIn = "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21"; // Replace with actual token address
     const tokenOut = "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21"; // Replace with actual token address
     const optionalArray = []; // Pass an array if needed

     const amountOut = await getOutAmount(
       amountIn,
       tokenIn,
       tokenOut,
       optionalArray
     );
     console.log("Fetched Amount Out:", amountOut);
   };

   fetchOutAmount();
 }, [isConnected, walletAddress, selectedOptionFrom, selectedOptionTo,]);

 const checkNetwork = async () => {
   const provider =
     window.ethereum != null
       ? new ethers.providers.Web3Provider(window.ethereum)
       : ethers.providers.getDefaultProvider();
   console.log("provider", provider);
   const network = await provider.getNetwork();
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


 const handleApproval = async() => {
  try {
    const res = await GetApproval(walletAddress, selectedOptionFrom.address, metis)

    console.log("res",res);
    if(res === "0"){
      setneedApproval(true)
    }
    
  } catch (error) {
    console.log("eerror in alloaef",error);
    
  }
 }
 const handleGetOut = async(validValue) => {
  try {
    const res = await GetOutAmount(validValue, selectedOptionFrom.address, selectedOptionTo.address)

    console.log("res",res);
   
    
  } catch (error) {
    console.log("eerror in get out",error);
    
  }
 }

 const handleInputChange = (e) => {
   const value = e.target.value;
   const validValue = value.replace(/[^0-9.]/g, "");
   if (validValue.split(".").length > 2) return;

   setInputValue(validValue);

   if (selectedOptionFrom.name !== "METIS") {
     handleApproval();
   }
   handleGetOut(validValue)
   
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

 const handleMaxClick = () => {
   setInputValue( inputBal);
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

 const isInsufficientBalance = parseFloat(inputValue) > parseFloat(inputBal);
 
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black relative">
      <img
        src={logo}
        alt=""
        className="bg-black p-[5px] rounded-md h-[20px] sm:h-[40px] w-[50px] sm:w-[90px] mx-auto  sm:mb-4"
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
              <div className="sm:text-xs text-[10px] text-balanceText text-start font-medium  px-1 sm:px-2">
                Balance:{isConnected ? fromTokenBalance : "0.0"}
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
              <div className="sm:text-xs text-[10px] text-balanceText text-start font-medium  px-1 sm:px-2">
                Balance: {isConnected ? toTokenBalance : "0.0"}
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
                  className={`text-black font-two cursor-pointer rounded-full p-1 sm:p-2 text-sm sm:text-lg font-semibold text-center items-center ${
                    isProcessing ? "bg-notConnectedBg" : "bg-custom-gradient"
                  }  ${isProcessing ? "text-white" : "text-black"} ${
                    isMaxHovered ? "text-white" : "text-black"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2 text-[#696a6b] ">
                      <div role="status" class="spinner-border"></div>
                      Processing...
                    </div>
                  ) : (
                    `Approve ${selectedOptionFrom.name}`
                  )}
                </button>
              ) : (
                <button
                  onMouseDown={() => setIsMaxHovered(true)}
                  onMouseUp={() => setIsMaxHovered(false)}
                  onMouseLeave={() => setIsMaxHovered(false)}
                  className={`text-black bg-custom-gradient ${
                    isMaxHovered ? "text-white" : "text-black"
                  } font-two cursor-pointer bg-notConnectedBg rounded-full p-1 sm:p-2 text-sm sm:text-lg font-semibold text-center items-center`}
                  onClick={() => setShowTransactionSwap(true)}
                >
                  Swap
                </button>
              )
            ) : (
              <button className="text-[#696a6b] font-two bg-notConnectedBg w-full p-1 sm:p-2 text-sm sm:text-lg font-semibold mt-1">
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
        />
      )}
    </div>
  );
};

export default Swap;
