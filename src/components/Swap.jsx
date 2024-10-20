import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import musdc from '../assets/images/musdc.svg'
import metis from '../assets/images/vmetis.png'
import { MdSwapVert } from "react-icons/md";


const Swap = () => {
  const [isDropdownOpenFrom, setIsDropdownOpenFrom] = useState(false);  
  const [isDropdownOpenTo, setIsDropdownOpenTo] = useState(false);      
  const [selectedOptionFrom, setSelectedOptionFrom] = useState("m.USDC");
  const [selectedOptionTo, setSelectedOptionTo] = useState("METIS");

  // Toggle the "From" dropdown visibility
  const toggleDropdownFrom = () => {
    setIsDropdownOpenFrom(!isDropdownOpenFrom);
    setIsDropdownOpenTo(false);  
  };

  // Toggle the "To" dropdown visibility
  const toggleDropdownTo = () => {
    setIsDropdownOpenTo(!isDropdownOpenTo);
    setIsDropdownOpenFrom(false);  
  };

  // Handle option selection for "From" dropdown
  const handleOptionSelectFrom = (option) => {
    setSelectedOptionFrom(option);
    setIsDropdownOpenFrom(false); 
  };

  // Handle option selection for "To" dropdown
  const handleOptionSelectTo = (option) => {
    setSelectedOptionTo(option);
    setIsDropdownOpenTo(false); 
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9.]/g, '');
    if (validValue.split('.').length > 2) return;

    setInputValue(validValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === '-' ) {
      e.preventDefault();  
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 rounded-2xl shadow-md sm:w-[490px] md:w-[500px] bg-primaryBg">
        <h1 className="text-start text-white text-2xl font-semibold mb-7">Swap</h1>

        {/* First row */}
        <div className=" flex gap-3">
       
          <div
            className="flex items-center w-2/4 h-20 px-2 bg-inputBg rounded-xl cursor-pointer"
            onClick={toggleDropdownFrom}
          >
            <img
              src={musdc}
              alt="Left icon"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div className="">
              <div className="text-xs text-gray-400 text-start">From</div>
              <div className='flex items-center justify-between'>
                <div className="bg-inputBg text-white font-semibold focus:outline-none">
                  {selectedOptionFrom}
                </div>
                <RiArrowDropDownLine className='text-gray-400 mt-1 w-7 h-5' />
              </div>
            </div>
          </div>

       
          {isDropdownOpenFrom && (
            <div className="absolute mt-1 bg-inputBg text-white border rounded-lg w-2/4 p-2">
              <div onClick={() => handleOptionSelectFrom("Option 1")} className="p-2 hover:bg-gray-700 cursor-pointer">Option 1</div>
              <div onClick={() => handleOptionSelectFrom("Option 2")} className="p-2 hover:bg-gray-700 cursor-pointer">Option 2</div>
            </div>
          )}

          {/* Right side input */}
          <div className="flex  w-full p-2 rounded-xl bg-inputBg">
            <div className='flex flex-col'>
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
            <div className="text-xs text-gray-400 text-start px-2">Balance: 0</div>
            </div>
           
            <div className='flex justify-between'>
              
              <button className='bg-custom-gradient text-black px-2 h-8 mt-4   text-base font-medium rounded-xl'>Max</button>
            </div>
          </div>
        </div>

        {/* swap button */}
        <div>
        <MdSwapVert className='text-white ml-[8.5rem] text-4xl font-bold hover:bg-notConnectedBg p-1 rounded-full  ' />
        </div>

        {/* Second row */}
        <div className=" flex gap-3">
         
          <div
            className="flex items-center w-2/4 h-20 px-2  bg-inputBg rounded-xl cursor-pointer"
            onClick={toggleDropdownTo}
          >
            <img
              src={metis}
              alt="Left icon"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div className="">
              <div className="text-xs text-gray-400 text-start">To</div>
              <div className='flex items-center justify-between'>
                <div className="bg-inputBg text-white font-semibold focus:outline-none">
                  {selectedOptionTo}
                </div>
                <RiArrowDropDownLine className='text-gray-400 mt-1 w-7 h-5' />
              </div>
            </div>
          </div>

        
          {isDropdownOpenTo && (
            <div className="absolute mt-1 bg-inputBg text-white border rounded-lg w-2/4 p-2">
              <div onClick={() => handleOptionSelectTo("Option 1")} className="p-2 hover:bg-gray-700 cursor-pointer">Option 1</div>
              <div onClick={() => handleOptionSelectTo("Option 2")} className="p-2 hover:bg-gray-700 cursor-pointer">Option 2</div>
            </div>
          )}

          {/* Right side input */}
          <div className="flex flex-col w-full p-2 rounded-xl bg-inputBg">
            <input
              type="number"
              placeholder="0.0"
              className="text-white bg-inputBg text-xl font-semibold p-2 w-full focus:outline-none"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              readOnly
            />
            <div className="text-xs text-gray-400 text-start px-2">Balance: 0</div>
          </div>
        </div>

        {/* button */}
        <button className='text-notConnectedText bg-notConnectedBg w-full p-3 rounded-xl font-semibold text-lg mt-5 '>Not Connected</button>
      </div>
    </div>
  );
};

export default Swap;
