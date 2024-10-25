import React,{useState} from "react";

import { IoIosClose } from "react-icons/io";
import metis from "../assets/images/metis.png";
import musdc from "../assets/images/musdc.svg";
import { FaArrowDown } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";

const TransactionSwap = ({
  fromToken,
  toToken,
  onSwapClick,
  onClose,
  onCancel,
  inputVal, 
  outputVal
}) => {
 const [isMaxHovered, setIsMaxHovered] = useState(false);
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
        <div className="mb-3 sm:mb-7 flex justify-between items-center">
          <h1 className="text-start text-white text-lg sm:text-2xl text-two font-semibold">
            Swap
          </h1>
          <IoIosClose
            size={28}
            className="hover:text-white text-notConnectedText mt-1 items-center cursor-pointer"
            onClick={onClose} // Close functionality
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-3">
          <div className="text-white flex">
            <img
              src={fromToken.image}
              alt=""
              className="sm:w-10 w-7 sm:h-10 h-7 rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <p className="text-white font-semibold focus:outline-none text-[13px] sm:text-base text-left">
                {fromToken.name}
              </p>
              <h1 className="sm:text-sm text-[11px] font-medium text-two text-balanceText text-start">
                {inputVal}
              </h1>
            </div>
          </div>

          <FaArrowDown
            size={20}
            className="text-notConnectedText items-center ml-1 sm:ml-2.5"
          />

          <div className="text-white flex">
            <img
              src={toToken.image}
              alt=""
              className="sm:w-10 w-7 sm:h-10 h-7 rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <p className="text-white font-semibold focus:outline-none text-[13px] sm:text-base text-left">
                {toToken.name}
              </p>
              <h1 className="sm:text-sm text-[11px] font-medium text-two text-balanceText text-start">
                {outputVal}
              </h1>
            </div>
          </div>
        </div>
        {/* <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          className="alert mt-3 mb-0 bg-[#ff353519] bg-opacity-50 text-[#ff3535] border-none font-normal px-6 text-[13px] text-left p-2 rounded-full"
        >
          Error: You cancelled the swap
        </div> */}

        <div className="text-white my-2 sm:my-6 flex flex-col gap-0.5 sm:gap-1">
          <div className="flex justify-between">
            <p className="sm:text-[16px] text-[11px] font-normal text-two text-start">
              Minimum received
            </p>
            <p className="sm:text-[16px] text-[11px] font-normal text-two text-right items-center">
              {formatBalance(outputVal)} {toToken.name}{" "}
              {/* Replace with actual value */}
            </p>
          </div>
          <div className="flex justify-between gap-5">
            <p className="sm:text-[16px] text-[11px] font-normal text-two text-start">
              {fromToken.name}/{toToken.name} Rate
            </p>
            <p className="sm:text-[16px] text-[11px] font-normal text-two text-right flex items-center">
              1 {fromToken.name}{" "}
              <BsArrowRight size={20} className="items-center font-thin mx-1" />
              {/* Add actual rate */} 44.607 {toToken.name}
            </p>
          </div>
          <div className="flex justify-between gap-5">
            <p className="sm:text-[16px] text-[11px] font-normal text-two text-start">
              {toToken.name}/{fromToken.name} Rate
            </p>
            <p className="sm:text-[16px] text-[11px] font-normal text-two text-right flex items-center">
              1 {toToken.name}{" "}
              <BsArrowRight size={20} className="items-center font-thin mx-1" />
              {/* Add actual rate */} 0.022 {fromToken.name}
              
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <button
            onClick={onCancel}
            className="text-white font-two bg-notConnectedBg w-1/2 p-1.5 sm:p-2 rounded-full font-medium text-xs sm:text-lg text-center items-center"
          >
            Cancel
          </button>
          <button
            onMouseDown={() => setIsMaxHovered(true)}
            onMouseUp={() => setIsMaxHovered(false)}
            onMouseLeave={() => setIsMaxHovered(false)}
            onClick={onSwapClick}
            className={`${
              isMaxHovered ? "text-white" : "text-black"
            }  bg-custom-gradient font-two bg-notConnectedBg w-1/2 p-1.5 sm:p-2 rounded-full font-semibold text-xs sm:text-lg text-center items-center`}
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSwap;
