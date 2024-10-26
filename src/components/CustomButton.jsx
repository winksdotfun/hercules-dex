import React, { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { motion } from "framer-motion";



import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const CustomButton = ({ setConnectionType, setIsConnected }) => {
  const account = useAccount();

  useEffect(() => {
    if (typeof setIsConnected === "function") {
      setIsConnected(account.isConnected);
    }
    if (account.isConnected && typeof setConnectionType === "function") {
      setConnectionType("wagmi");
    }
  }, [account.isConnected]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="  flex justify-center mx-auto pt-2">
                    <motion.button
                      onClick={openConnectModal}
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      className={`bg-custom-gradient text-black
                       p-1 sm:p-2 items-center text-[10px] h-fit hidden sm:block sm:text-sm font-semibold text-center justify-center rounded-full`}
                    >
                      Connect
                    </motion.button>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <div className="  flex justify-center mx-auto pt-2">
                    <motion.button
                      onClick={openChainModal}
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      className={`bg-red-400 text-black
                       p-1 sm:p-2 items-center text-[10px] h-fit  sm:text-sm font-semibold text-center justify-center rounded-full`}
                    >
                      Wrong Network
                    </motion.button>
                  </div>
                );
              }

              return (
                <div className="  flex justify-center mx-auto pt-2">
                  <motion.button
                    className={`bg-custom-gradient text-black
                       p-1 sm:p-2 items-center text-[10px] h-fit  sm:text-sm font-semibold text-center justify-center rounded-full`}
                    onClick={openAccountModal}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </motion.button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomButton;
