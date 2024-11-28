import React, { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { logAnalyticsEvent, Events } from '../firebase/analytics';

const CustomButton = ({ setConnectionType, setIsConnected }) => {
  const account = useAccount();

  useEffect(() => {
    if (typeof setIsConnected === "function") {
      setIsConnected(account.isConnected);
    }
    if (account.isConnected && typeof setConnectionType === "function") {
      setConnectionType("wagmi");
      
      // Log wallet connection
      logAnalyticsEvent(Events.WALLET_CONNECTED, {
        wallet_type: 'wagmi',
        user_address: account.address
      });
    }
  }, [account.isConnected]);

const handleConnectMetaMask = async () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (currentChainId !== METIS_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: METIS_CHAIN_ID }],
          });
          
          // Log network switch
          logAnalyticsEvent(Events.NETWORK_SWITCHED, {
            from_chain_id: currentChainId,
            to_chain_id: METIS_CHAIN_ID,
            chain_name: 'Metis Andromeda'
          });
        } catch (switchError) {
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

      // Request account access if not already connected
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length === 0) {
          // If no accounts are found, show alert
          throw new Error("No accounts found. Please connect to MetaMask.");
        }

        console.log("MetaMask is connected to Metis");

        if (isMobile) {
          // Suggest opening the MetaMask app on mobile if needed
          window.open(
            "https://metamask.app.link/dapp/hercules-wink.vercel.app",
            "_blank"
          );
        }
      } catch (accountError) {
        console.error("Error connecting accounts:", accountError);
        if (isMobile) {
          window.open(
            "https://metamask.app.link/dapp/hercules-wink.vercel.app",
            "_blank"
          );
          alert("Please open MetaMask and connect to your wallet.");
        } else {
          alert("Error connecting to MetaMask. Please try again.");
        }
        return;
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
