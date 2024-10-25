import React from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-md"
        >
          <button className="absolute top-2 right-2" onClick={onClose}>
            &times;
          </button>
          {children}
        </motion.div>
      </div>
    )
  );
};

export default Modal;
