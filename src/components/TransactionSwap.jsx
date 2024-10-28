import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import { Swap } from "../integration";
import { ethers } from "ethers"; 

const TransactionSwap = ({
  fromToken,
  toToken,
  onSwapClick,
  onClose,
  onCancel,
  inputVal,
  outputVal,
}) => {
  const [isMaxHovered, setIsMaxHovered] = useState(false);
  const [fromAdd, setFromAdd] = useState('');
  const [ToAdd, setToAdd] = useState("");
  const [Input, setInput] = useState("");

 const handleSwapClick = async () => {
   try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const amountin = inputVal; // Ensure this is a valid number
      const tokenin = fromToken?.address; // Check fromToken is defined
      const tokenout = toToken?.address; // Check toToken is defined
      const recipientAddress = await signer.getAddress();

     // Ensure all values are defined
     if (!amountin || !tokenin || !tokenout || !recipientAddress) {
       throw new Error("One or more swap parameters are undefined.");
     }

     await Swap(amountin, tokenin, tokenout, recipientAddress);
     console.log("Swap initiated successfully");

     //if (onSwapClick) onSwapClick();
   } catch (error) {
     console.error("Error executing swap:", error);
   }
 };



  const formatBalance = (balance) => {
    const numBalance = parseFloat(balance);
    if (numBalance < 0.00001 && numBalance > 0) {
      return "<0.00001";
    }
    return numBalance.toFixed(5);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black p-2">
      <div className="p-2 sm:p-6 rounded-3xl border-[#6c757d33] border-[.5px] shadow-md w-full sm:w-[490px] md:w-[500px] bg-primaryBg">
        <div className="mb-2 sm:mb-7 flex justify-between items-center">
          <h1 className="text-start text-white text-base sm:text-2xl font-semibold">
            Swap
          </h1>
          <IoIosClose size={28} className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-3">
          <div className="text-white flex">
            <img
              src={fromToken.image}
              alt=""
              className="sm:w-10 w-5 sm:h-10 h-5 rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-[12px] sm:text-base text-left">
                {fromToken.name}
              </p>
              <h1 className="sm:text-sm text-[10px] text-balanceText text-start">
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
              <p className="font-semibold text-[12px] sm:text-base text-left">
                {toToken.name}
              </p>
              <h1 className="sm:text-sm text-[10px] text-balanceText text-start">
                {outputVal}
              </h1>
            </div>
          </div>
        </div>

        <div className="text-white my-2 sm:my-6 flex flex-col gap-1">
          <div className="flex justify-between">
            <p className="sm:text-[16px] text-[9px] text-two text-start">
              Minimum received
            </p>
            <p className="sm:text-[16px] text-[9px] text-two text-right">
              {formatBalance(outputVal)} {toToken.name}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="sm:text-[16px] text-[9px] text-two text-start">
              {fromToken.name}/{toToken.name} Rate
            </p>
            <p className="sm:text-[16px] text-[9px] text-two text-right flex items-center">
              1 {fromToken.name} <BsArrowRight className="mx-1" /> 44.607{" "}
              {toToken.name}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="sm:text-[16px] text-[9px] text-two text-start">
              {toToken.name}/{fromToken.name} Rate
            </p>
            <p className="sm:text-[16px] text-[9px] text-two text-right flex items-center">
              1 {toToken.name} <BsArrowRight className="mx-1" /> 0.022{" "}
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
