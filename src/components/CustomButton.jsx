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



const handleConnectMetaMask = async () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Define Metis chain ID and network details
  const METIS_CHAIN_ID = "0x440"; // Hexadecimal representation of Metis (1088)
  const METIS_NETWORK_PARAMS = {
    chainId: METIS_CHAIN_ID,
    chainName: "Metis Andromeda",
    nativeCurrency: {
      name: "Metis",
      symbol: "METIS",
      decimals: 18,
    },
    rpcUrls: ["https://andromeda.metis.io/?owner=1088"],
    blockExplorerUrls: ["https://andromeda-explorer.metis.io/"],
  };

  if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
    try {
      // Check if the current network is Metis
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (currentChainId !== METIS_CHAIN_ID) {
        // Attempt to switch to the Metis chain
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: METIS_CHAIN_ID }],
          });
        } catch (switchError) {
          // If the chain is not added to MetaMask, request to add it
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [METIS_NETWORK_PARAMS],
              });
            } catch (addError) {
              console.error("Failed to add Metis network:", addError);
              return;
            }
          } else {
            console.error("Failed to switch to Metis network:", switchError);
            return;
          }
        }
      }

      // If on mobile, suggest opening the MetaMask app
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (isMobile && accounts.length === 0) {
        // Redirect to MetaMask app using a deep link
        window.open(
          "https://metamask.app.link/dapp/hercules-wink.vercel.app",
          "_blank"
        );
        alert("Please open MetaMask and connect to your wallet.");
      } else {
        // Request account access if not already connected
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask is connected to Metis");
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    // Suggest installing MetaMask or opening the MetaMask app on mobile
    if (isMobile) {
      window.open(
        "https://metamask.app.link/dapp/hercules-wink.vercel.app",
        "_blank"
      );
      alert("Please open MetaMask and connect to your wallet.");
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask to use this feature."
      );
    }
  }
};






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

                    <motion.button
              onClick={handleConnectMetaMask}
              type="button"
              whileTap={{ scale: 0.9 }}
              className={`bg-custom-gradient text-black
                       p-1 sm:p-2 items-center text-[10px] h-fit sm:hidden block sm:text-sm font-semibold text-center justify-center rounded-full`}
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
