import React from 'react'
import { IoIosClose } from "react-icons/io";
import metis from "../assets/images/metis.png";
import musdc from "../assets/images/musdc.svg";
import { CgArrowLongRight } from "react-icons/cg";
import Arrow from './Arrow';
import CenterIcon from './CenterIcon';
import Loader from './Loader';
import load from '../assets/images/load.svg'
const TranscationCompleted = ({
  fromToken,
  toToken,
  onClose,
  onCancel ,
}) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black py-2">
        <div className="p-3 sm:p-6 rounded-3xl border-[#6c757d33] border-[.5px] shadow-md w-fit sm:w-[490px] md:w-[500px] bg-primaryBg">
          <div className="mb-3 sm:mb-7 flex justify-between items-center">
            <h1 className="text-start text-white text-lg sm:text-2xl text-two font-semibold">
              Swap
            </h1>
            <IoIosClose
              size={28}
              className="hover:text-white text-notConnectedText mt-1 items-center cursor-pointer"
              onClick={onCancel}
            />
          </div>
          {/* <Loader /> */}
          <img src={load} alt="" className='h-36 w-36 mx-auto mb-2'/>
          <div className="flex  gap-20 border-2 border-[#6c757d33] rounded-2xl p-2 items-center justify-center mx-auto">
            <div className="text-white flex">
              <img
                src={fromToken.image}
                alt=""
                className="  w-7  h-7 rounded-full object-cover mr-2"
              />
              <p className="text-white font-semibold focus:outline-none text-[13px] sm:text-xl">
                {fromToken.name}
              </p>
            </div>

            <div className="text-white flex">
              <img
                src={toToken.image}
                alt=""
                className="  w-7  h-7 rounded-full object-cover mr-2"
              />

              <h1 className="text-white font-semibold focus:outline-none text-[13px] sm:text-xl">
                {toToken.name}
              </h1>
            </div>
          </div>
          <div className="flex justify-between items-center px-5 mt-8">
            <div>
              <p className="sm:text-[16px] text-[11px] font-normal text-two  text-start text-balanceText">
                {fromToken.name}
              </p>
              <p className="sm:text-[16px] text-[11px] font-normal text-two  text-start text-white">
                0.01
              </p>
            </div>
            <Arrow />
            <CenterIcon />
            <Arrow />

            <div>
              <p className="sm:text-[16px] text-[11px] font-normal text-two  text-start text-balanceText">
                {toToken.name}
              </p>
              <p className="sm:text-[16px] text-[11px] font-normal text-two  text-start text-white">
                0.4461
              </p>
            </div>
          </div>
          <div className="w-full mt-8 flex gap-2  justify-center">
            <div className="spinner mt-0.5"></div>

            <div className="flex flex-col gap-1  ">
              <p className="sm:text-[17px] text-[11px] font-medium text-two  text-start text-white">
                Transaction Pending
              </p>
              <p className="sm:text-[14px] text-[11px] font-medium text-two  text-left text-balanceText">
                Transaction is waiting
              </p>
            </div>
          </div>
          {/* <div className="w-full mt-8 flex gap-2  justify-center">
            <div className="success-icon mt-0.5"></div>
            <div className="flex flex-col gap-1 ">
              <p className="sm:text-[17px] text-[11px] font-medium text-two  text-start text-white">
                Transaction Completed!
              </p>
              <p className="sm:text-[14px] text-[11px] font-medium text-two text-left   text-balanceText">
                Successfully swapped 0.01 METIS <br /> for 0.0495 m.USDC
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TranscationCompleted
