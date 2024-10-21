import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import musdc from "../assets/images/musdc.svg";
import metis from "../assets/images/vmetis.png";
import Token from "./Token";
import { Options } from "../constant/index"; // Ensure Options contains token data
import logo from '../assets/images/logo.svg'

const Swap = () => {
  const [isDropdownOpenFrom, setIsDropdownOpenFrom] = useState(false);
  const [isDropdownOpenTo, setIsDropdownOpenTo] = useState(false);
  const [isMaxHovered, setIsMaxHovered] = useState(false); // State to track button hover

  // State to store selected token and its image
  const [selectedOptionFrom, setSelectedOptionFrom] = useState({
    name: "m.USDC",
    image: musdc,
  });
  const [selectedOptionTo, setSelectedOptionTo] = useState({
    name: "METIS",
    image: metis,
  });

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
    if (!selected) return; // Ensure selected option exists

    if (selected.head === selectedOptionTo.name) {
      // If the same token is selected for "From" and "To", swap them
      setSelectedOptionTo(selectedOptionFrom);
      setSelectedOptionFrom({
        name: selected.head,
        image: selected.image,
      });
    } else {
      setSelectedOptionFrom({
        name: selected.head,
        image: selected.image,
      });
    }
    setIsDropdownOpenFrom(false);
  };

  const handleOptionSelectTo = (optionName) => {
    const selected = Options.find((opt) => opt.head === optionName);
    if (!selected) return; // Ensure selected option exists

    if (selected.head === selectedOptionFrom.name) {
      // If the same token is selected for "From" and "To", swap them
      setSelectedOptionFrom(selectedOptionTo);
      setSelectedOptionTo({
        name: selected.head,
        image: selected.image,
      });
    } else {
      setSelectedOptionTo({
        name: selected.head,
        image: selected.image,
      });
    }
    setIsDropdownOpenTo(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpenFrom(false);
    setIsDropdownOpenTo(false);
  };

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9.]/g, "");
    if (validValue.split(".").length > 2) return;

    setInputValue(validValue);
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
    // Set input value to balance or the max value if you have it
    setInputValue("0"); // Example: set to maximum balance
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black relative">
      <img
        src={logo}
        alt=""
        className="bg-black p-[5px] rounded-md h-[20px] sm:h-[40px] w-[50px] sm:w-[90px] mx-auto  sm:mb-4"
      />

      <div className="p-6 rounded-2xl shadow-md sm:w-[490px] md:w-[500px] bg-primaryBg">
        <div className="mb-7 flex justify-between items-center">
          <h1 className="text-start text-white text-2xl font-semibold">Swap</h1>
          <button className="font-two bg-custom-gradient text-black text-sm font-semibold px-3 py-1.5 pb-2 rounded-full">
            Connect
          </button>
        </div>

        {/* First row */}
        <div className="flex gap-3">
          <div
            className="flex items-center w-[220px] h-20 px-2 bg-inputBg hover:bg-[#181818] rounded-3xl cursor-pointer"
            onClick={toggleDropdownFrom}
          >
            <img
              src={selectedOptionFrom.image}
              alt="Left icon"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div>
              <div className="text-sm font-medium text-two text-balanceText text-start">
                From
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold focus:outline-none">
                  {selectedOptionFrom.name}
                </div>
                <RiArrowDropDownLine className="text-gray-400 mt-1 w-7 h-5" />
              </div>
            </div>
          </div>

          {/* Dropdown for "From" */}
          {isDropdownOpenFrom && (
            <Token
              closeDropdown={closeDropdown}
              onSelectToken={handleOptionSelectFrom}
            />
          )}

          {/* Right side input */}
          <div className="flex w-full p-2 rounded-3xl bg-inputBg">
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="0.0"
                className="text-white bg-inputBg text-xl font-semibold p-2 w-full focus:outline-none"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                min={0}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <div className="text-xs text-balanceText text-start font-medium px-2">
                Balance: 0
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleMaxClick}
                onMouseDown={() => setIsMaxHovered(true)} // Change color on mouse down
                onMouseUp={() => setIsMaxHovered(false)} // Revert color on mouse up
                onMouseLeave={() => setIsMaxHovered(false)} // Revert color on mouse leave
                className={`bg-custom-gradient ${
                  isMaxHovered ? "text-white" : "text-black"
                } px-2 h-8 mt-4 text-xs font-medium rounded-full`}
              >
                MAX
              </button>
            </div>
          </div>
        </div>

        {/* swap button */}
        <button
          onClick={handleSwap}
          className={`hover:bg-notConnectedBg rounded-full p-2 w-fit absolute left-[9.8rem] -mt-2.5 ${
            isDropdownOpenFrom || isDropdownOpenTo ? "-z-50" : ""
          }`}
        >
          <svg
            width="18"
            height="20"
            viewBox="0 0 17 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="font-semibold"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.70695 3.82828L9.70695 10.9141L11.707 10.9141L11.707 3.82828L14.9998 7.12117L16.4141 5.70696L11.4141 0.706956L10.707 -0.000150182L9.99985 0.706956L4.99985 5.70696L6.41406 7.12117L9.70695 3.82828Z"
              fill="white"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.70711 17.0858V10H4.70711V17.0858L1.41421 13.7929L0 15.2071L5 20.2071L5.70711 20.9142L6.41421 20.2071L11.4142 15.2071L10 13.7929L6.70711 17.0858Z"
              fill="white"
            ></path>
          </svg>
        </button>

        {/* Second row */}
        <div className="flex gap-3 mt-4">
          <div
            className="flex items-center w-[220px] h-20 px-2 bg-inputBg hover:bg-[#181818] rounded-3xl cursor-pointer"
            onClick={toggleDropdownTo}
          >
            <img
              src={selectedOptionTo.image}
              alt="Left icon"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div>
              <div className="text-sm font-medium text-two text-balanceText text-start">
                To
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold focus:outline-none">
                  {selectedOptionTo.name}
                </div>
                <RiArrowDropDownLine className="text-gray-400 mt-1 w-7 h-5" />
              </div>
            </div>
          </div>

          {/* Dropdown for "To" */}
          {isDropdownOpenTo && (
            <Token
              closeDropdown={closeDropdown}
              onSelectToken={handleOptionSelectTo}
            />
          )}

          <div className="flex w-full p-2 rounded-3xl bg-inputBg">
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="0.0"
                className="text-white bg-inputBg text-xl font-semibold p-2 w-full focus:outline-none placeholder:text-balanceText"
                style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
                min={0}
                readOnly
              />
              <div className="text-xs text-balanceText text-start font-medium px-2">
                Balance: 0
              </div>
            </div>
          </div>
        </div>

        {/* button */}
        <button className="text-[#696a6b] font-two bg-notConnectedBg w-full p-3 rounded-xl font-semibold text-lg mt-5">
          Not Connected
        </button>
      </div>
    </div>
  );
};

export default Swap;
