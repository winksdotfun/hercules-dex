import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import { Swap } from "../integration";
import { ethers } from "ethers";
import axios from "axios";

const TransactionSwap = ({
  fromToken,
  toToken,
  onSwapClick,
  onClose,
  onCancel,
  inputVal,
  setShowSwapModal,
  setSuccess,
  outputVal,
  setProcessModel,
  setOV,
  setIV,
}) => {
  const [isMaxHovered, setIsMaxHovered] = useState(false);
  const [fromPrice, setFromPrice] = useState(null);
  const [toPrice, setToPrice] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [transNotSuccess, setTransNotSuccess]  = useState(false);
  useEffect(() => {
    axios
      .get("https://api.ultimatedigits.com/winks/proxy")
      .then((response) => {
        const tokens = response.data.data.tokens;
        const fromTokenData = tokens[fromToken.address];
        const toTokenData = tokens[toToken.address];

        // Set prices if both tokens exist in the response
        if (fromTokenData && toTokenData) {
          setFromPrice(fromTokenData.price);
          setToPrice(toTokenData.price);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [fromToken.address, toToken.address]);

  const calculateExchangeRate = () => {
    if (fromPrice && toPrice) {
      const fromToRate = toPrice / fromPrice;
      const toFromRate = fromPrice / toPrice;
      return {
        fromToRate: fromToRate.toFixed(3),
        toFromRate: toFromRate.toFixed(3),
      };
    }
    return { fromToRate: "-", toFromRate: "-" };
  };

  const { fromToRate, toFromRate } = calculateExchangeRate();

  const handleSwapClick = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const amountin = inputVal;
      const tokenin = fromToken?.address;
      const tokenout = toToken?.address;
      const recipientAddress = await signer.getAddress();

      if (!amountin || !tokenin || !tokenout || !recipientAddress) {
        throw new Error("One or more swap parameters are undefined.");
      }

      setProcessModel(true);

      // Explicitly handle Swap response and errors
      const res = await Swap(
        amountin,
        tokenin,
        tokenout,
        recipientAddress
      ).catch((error) => {
        console.error("Error caught in Swap call:", error);
        throw error; // Ensure it propagates to the outer catch
      });

      if (!res) {
        throw new Error("Swap function did not return a valid response.");
      }

      console.log("Swap initiated successfully:", res);

      if (res) {
        setSuccess(true); // Mark as
        setIV('');
        setOV('');
      }

      if (onSwapClick) onSwapClick(); // Additional callback logic
    } catch (error) {
      console.error("Error executing swap in handleSwapClick:", error);

      if (
        error.code === 4001 || // MetaMask rejection
        error.message.includes("user rejected transaction")
      ) {
        console.log("User canceled the swap.");
        setCancelled(true); // Handle cancellation
      }
      else{
        setTransNotSuccess(true);
      }
      
      // Update UI states
      setShowSwapModal(true);
      setProcessModel(false);
    }
  };

  const formatBalance = (balance) => {
    const numBalance = parseFloat(balance);
    if (numBalance < 0.00001 && numBalance > 0) {
      return "<0.00001";
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 5,
      maximumFractionDigits: 5,
    }).format(numBalance);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black p-2">
      <div className="p-2 sm:p-6 rounded-3xl border-[#6c757d33] border-[.5px] shadow-md w-full sm:w-[490px] md:w-[500px] bg-primaryBg">
        <div className="mb-2 sm:mb-7 flex justify-between items-center">
          <h1 className="text-start text-white text-base sm:text-2xl font-semibold">
            Swap
          </h1>
          <IoIosClose
            size={28}
            className="cursor-pointer text-notConnectedText hover:text-white"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-3">
          <div className="text-white flex">
            <img
              src={fromToken.image}
              alt=""
              className="sm:w-10 w-5 sm:h-10 h-5 rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <p className="sm:text-sm text-[10px] font-medium text-balanceText text-start">
                {fromToken.name}
              </p>
              <h1 className="font-semibold text-[12px] sm:text-2xl text-left">
                {inputVal}
              </h1>
            </div>
          </div>
          <FaArrowDown className="text-notConnectedText items-center ml-1 sm:ml-2.5 text-base sm:text-2xl" />
          <div className="text-white flex">
            <img
              src={toToken.image}
              alt=""
              className="sm:w-10 w-5 sm:h-10 h-5 rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <p className="sm:text-sm text-[10px] font-medium text-balanceText text-start">
                {toToken.name}
              </p>
              <h1 className="font-semibold text-[12px] sm:text-2xl text-left">
                {outputVal}
              </h1>
            </div>
          </div>
        </div>
        {cancelled && (
          <div
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className="alert mt-3 mb-0 bg-[#ff353519] bg-opacity-50 text-[#ff3535] border-none font-normal px-6 text-[13px] text-left p-2 rounded-full"
          >
            {"Error: You cancelled the swap"}
          </div>
        )}
        {transNotSuccess && (
          <div
            role="alert"
            aria-live="polite"
            aria-atomic="true"
            className="alert mt-3 mb-0 bg-[#ff353519] bg-opacity-50 text-[#ff3535] border-none font-normal px-6 text-[13px] text-left p-2 rounded-full"
          >
            {"Error: Transaction is not successfull"}
          </div>
        )}

        <div className="text-white my-2 sm:my-6 flex flex-col gap-1">
          <div className="flex justify-between">
            <p className="sm:text-[14px] text-[9px] text-two text-start">
              Minimum received
            </p>
            <p className="sm:text-[14px] text-[9px] text-two text-right">
              {formatBalance(outputVal)} {toToken.name}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="sm:text-[14px] text-[9px] text-two text-start">
              {fromToken.name}/{toToken.name} Rate
            </p>
            <p className="sm:text-[14px] text-[9px] text-two text-right flex items-center">
              1 {fromToken.name} <BsArrowRight className="mx-1" />
              {toFromRate} {toToken.name}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="sm:text-[14px] text-[9px] text-two text-start">
              {toToken.name}/{fromToken.name} Rate
            </p>
            <p className="sm:text-[14px] text-[9px] text-two text-right flex items-center">
              1 {toToken.name} <BsArrowRight className="mx-1" /> {fromToRate}{" "}
              {fromToken.name}
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          <button
            onClick={onCancel}
            className="text-white bg-notConnectedBg w-1/2 p-1.5 sm:p-2 rounded-full text-xs sm:text-lg"
          >
            Cancel
          </button>
          <button
            onMouseDown={() => setIsMaxHovered(true)}
            onMouseUp={() => setIsMaxHovered(false)}
            onMouseLeave={() => setIsMaxHovered(false)}
            onClick={handleSwapClick}
            className={`${
              isMaxHovered ? "text-white" : "text-black"
            } bg-custom-gradient w-1/2 p-1.5 sm:p-2 rounded-full text-xs sm:text-lg`}
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSwap;
