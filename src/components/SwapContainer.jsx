import React, { useState } from "react";
import TransactionSwap from "./TransactionSwap";
import TranscationCompleted from "./TranscationCompleted";
import { Swap } from "../integration";

const SwapContainer = ({ initialFromToken, initialToToken, onClose, inpVal, outVal }) => {
    const [showSwapModal, setShowSwapModal] = useState(true); // Track whether to show the modal
    const [fromToken, setFromToken] = useState(initialFromToken);
    const [toToken, setToToken] = useState(initialToToken);
    const [inputVal, setInputValue] = useState(inpVal);
    const [outputVal, setOutputValue] = useState(outVal);


    const handleSwapClick = async () => {

      console.log("vugygfytfuy");
      const res = await Swap();
      console.log("res",res);
      
      setShowSwapModal(false); // Switch to TransactionCompleted
    };

    const handleCloseCompleted = () => {
      setShowSwapModal(true); // Go back to TransactionSwap
    };

    const handleCancel = () => {
      setShowSwapModal(false); // Close the entire SwapContainer
      onClose(); // Call onClose prop to trigger parent close if needed
    };

    return (
      <div>
        {showSwapModal ? (
          <TransactionSwap
            fromToken={fromToken}
            toToken={toToken}
            onSwapClick={handleSwapClick}
            onClose={onClose}
            onCancel={handleCancel} // Pass down handleCancel
            inputVal={inputVal}
            outputVal={outputVal}
          />
        ) : (
          <TranscationCompleted
            fromToken={fromToken}
            toToken={toToken}
            onClose={handleCloseCompleted}
            onCancel={handleCancel}
            inputVal={inputVal}
            outputVal={outputVal}
          />
        )}
      </div>
    );
};

export default SwapContainer;
