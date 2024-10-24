import { ethers } from "ethers"; // Import ethers.js
import { Options, Commonbases } from "./constant/index";
 // Import your token data

async function getWalletDetails() {
  // Check if MetaMask or another wallet is installed
  if (typeof window.ethereum !== "undefined") {
    // Create a provider using the MetaMask provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request account access
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    // Get the wallet address
    const walletAddress = await signer.getAddress();
    
    // Initialize balances
    const balances = {};
    const tokenContracts = [...Options, ...Commonbases];

    for (const token of tokenContracts) {
      const contract = new ethers.Contract(
        token.address,
        [
          // ERC20 ABI
          "function balanceOf(address owner) view returns (uint256)",
        ],
        provider
      );

      const balance = await contract.balanceOf(walletAddress);
      balances[token.head] = ethers.utils.formatUnits(balance, 18); // Adjust decimals if needed
    }

    return {
      walletAddress,
      balances,
    };
  } else {
    return {
      walletAddress: null,
      balances: {},
    };
  }
}

export default getWalletDetails;
