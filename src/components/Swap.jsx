import React, { useState } from 'react';

const Swap = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select");

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 rounded-2xl shadow-md sm:w-[490px] w-full max-w-md bg-primaryBg">
        <h1 className="text-start text-white text-2xl font-bold mb-4">Swap</h1>
        
        <div className="space-y-4">
          {/* First Input with Dropdown and Image */}
          <div
            className="flex items-center w-[40%] p-2 bg-inputBg rounded-xl cursor-pointer"
            onClick={toggleDropdown} 
          >
            {/* Image */}
            <img
              src="https://via.placeholder.com/50"
              alt="Left icon"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />

            {/* Dropdown */}
            <div className="">
              <div className="text-sm text-gray-400 text-start mb-1">From</div>
              <div className="p-2  bg-inputBg text-white  focus:outline-none">
                {selectedOption} 
              </div>

            </div>
          </div>

          {/* Custom Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute mt-1 bg-inputBg text-white border rounded-lg w-2/4 p-2">
              <div onClick={() => handleOptionSelect("Option 1")} className="p-2 hover:bg-gray-700 cursor-pointer">Option 1</div>
              <div onClick={() => handleOptionSelect("Option 2")} className="p-2 hover:bg-gray-700 cursor-pointer">Option 2</div>
            </div>
          )}

          {/* Right Side Input */}
          <div className="flex flex-col w-full space-y-1">
            <input
              type="number"
              placeholder="Enter number"
              className="p-2 border rounded-lg bg-inputBg w-full focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
