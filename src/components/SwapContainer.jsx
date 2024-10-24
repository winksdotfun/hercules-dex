import React, { useState } from "react";
import TransactionSwap from "./TransactionSwap";
import TranscationCompleted from "./TranscationCompleted";

const SwapContainer = ({ initialFromToken, initialToToken, onClose }) => {
    const [showSwapModal, setShowSwapModal] = useState(true); // Track whether to show the modal
    const [fromToken, setFromToken] = useState(initialFromToken);
    const [toToken, setToToken] = useState(initialToToken);

    const handleSwapClick = () => {
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
          />
        ) : (
          <TranscationCompleted
            fromToken={fromToken}
            toToken={toToken}
            onClose={handleCloseCompleted}
            onCancel={handleCancel}
          />
        )}
      </div>
    );
};

export default SwapContainer;
