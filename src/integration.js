import Web3 from "web3";

import { ethers } from "ethers";

import abi from "./abi.json";

import tokenAbi from "./tokenabi.json";

const isBrowser = () => typeof window !== "undefined";

const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const contract_address = "0xF9a6d89DCCb139E26da4b9DF00796C980b5975d2";

export const Bridge = async (
  amount,
  destinationNetwork,
  destinationAddress,
  amountinWei,
  tokenAddress,
  forceUpdate,
  permitData
) => {
  console.log(
    "amount",
    amount,
    "destinationNetwork",
    destinationNetwork,
    "destinationAddress",
    destinationAddress,
    "amountinWei",
    amountinWei,
    "tokenAddress",
    tokenAddress,
    "forceUpdate",
    forceUpdate,
    "permitData",
    permitData
  );
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);

  try {
    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      const tx = await contract.bridgeAsset(
        destinationNetwork,
        destinationAddress,
        amountinWei,
        tokenAddress,
        forceUpdate,
        permitData,
        {
          value: amountinWei,
          gasLimit: 300000,
        }
      );

      await tx.wait();

      console.log("tx", tx);
      return tx;
    } else {
      const tx = await contract.bridgeAsset(
        destinationNetwork,
        destinationAddress,
        amountinWei,
        tokenAddress,
        forceUpdate,
        permitData,
        {
          gasLimit: 300000,
        }
      );

      await tx.wait();

      console.log("tx", tx);
      return tx;
    }
  } catch (error) {
    console.log("erior", error);
  }
};
export const ApproveToken = async (tokenAddress) => {
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  console.log("contract", contract);

  try {
    if (tokenAddress === "0x0000000000000000000000000000000000000000") {
      return;
    } else {
      const tx = await contract.approve(
        contract_address,
        "115792089237316195423570985008687907853269984665640564039457574004913129639935"
      );

      await tx.wait();

      console.log("tx", tx);
      return tx;
    }
  } catch (error) {
    console.log("erior", error);
  }
};
export const GetGas = async () => {
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);

  try {
    const gasPrice = await provider.getGasPrice();
    console.log("Gas price (in wei):", gasPrice.toString());

    // Define gas limit
    const gasLimit = 250000;

    // Calculate network fee
    const networkFee = gasPrice.mul(gasLimit); // gasPrice * gasLimit
    console.log("Estimated network fee (in wei):", networkFee.toString());

    return ethers.utils.formatEther(networkFee);
  } catch (error) {
    console.log("erior", error);
  }
};
export const GetBalance = async (address, tokenAddress, eth) => {
  console.log("Addres", address, "tokenAddress", tokenAddress, "eth", eth);
  // provider
  if (eth) {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    console.log("provider", provider);

    //signer

    const signer = provider.getSigner();

    console.log("signer", signer);
    // contract instance

    const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    console.log("contract", contract);

    try {
      const balance = await contract.balanceOf(address);

      console.log("balance in integration:", balance);

      return balance.toString();
    } catch (error) {
      console.log("error in error", error);
    }
  } else {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    console.log("provider", provider);

    //signer

    const signer = provider.getSigner();

    console.log("signer", signer);
    // contract instance

    const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    console.log("contract", contract);
    const balance = await contract.balanceOf(address);

    return balance.toString();
  }
};


export const GetApproval = async (address, tokenAddress, eth) => {
  console.log("Addres", address, "tokenAddress", tokenAddress, "eth", eth);
  // provider

  console.log("in approval");

  if (tokenAddress === "0x0000000000000000000000000000000000000000") {
    return 10000000000;
  }

  if (!eth) {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    console.log("provider", provider);

    //signer

    const signer = provider.getSigner();

    console.log("signer", signer);
    // contract instance

    const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    console.log("contract", contract);

    try {
      const balance = await contract.allowance(address, contract_address);

      console.log("Approval:", balance);

      return balance.toString();
    } catch (error) {
      console.log("error in error", error);
    }
  } else {
    const provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    console.log("provider", provider);

    //signer

    const signer = provider.getSigner();

    console.log("signer", signer);
    // contract instance

    const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

    console.log("contract", contract);
    const balance = await contract.allowance(address, contract_address);

    return balance.toString();
  }
};

export const GetOutAmount = async (amountIn, tokenIn, tokenOut) => {
  // console.log("Getting output amount");
  // console.log("Input Amount:", amountIn);
  // console.log("Token In Address:", tokenIn);
  // console.log("Token Out Address:", tokenOut);

  // Provider
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();
  console.log("Provider:", provider);

  // Signer
  const signer = provider.getSigner();
  console.log("Signer:", signer);

  // Contract instance
  const contract = new ethers.Contract(
    "0xF9a6d89DCCb139E26da4b9DF00796C980b5975d2",
    abi,
    signer
  );
  console.log("Contract:", contract);

  const tokenInCon = new ethers.Contract(tokenIn, tokenAbi, signer);
  const tokenOutCon = new ethers.Contract(tokenOut, tokenAbi, signer);

  try {
    const tokenInDecimals = await tokenInCon.decimals();
    const tokenOutDecimals = await tokenOutCon.decimals();

    //console.log("Token In Decimals:", tokenInDecimals.toString());
    //console.log("Token Out Decimals:", tokenOutDecimals.toString());

    // Convert the amountIn to the appropriate unit
    const val = ethers.utils.parseUnits(amountIn.toString(), tokenInDecimals);
    //console.log("Parsed Input Value:", val.toString());

    const trustedTokens = ["0x0000000000000000000000000000000000000000"];
    const maxSteps = 2;

    // Call the smart contract function to find the best path
    const tx = await contract.findBestPath(
      val,
      tokenIn,
      tokenOut,
      trustedTokens,
      maxSteps
    );

    // Log the entire transaction result to debug
    // console.log("Transaction Result:", tx);

    // Check if amounts are present in the transaction result
    if (!tx.amounts || tx.amounts.length === 0) {
      throw new Error("No amounts returned from transaction.");
    }

    // Convert the final output amount to a readable format
    const outputAmountRaw = tx.amounts[tx.amounts.length - 1];
    console.log("Raw Output Amount:", outputAmountRaw.toString());

    //Use formatUnits for output amount with the correct decimals
    const outputAmountFormatted = ethers.utils.formatUnits(
      outputAmountRaw,
      tokenOutDecimals
    );
    console.log("Formatted Output Amount:", outputAmountFormatted);

    // Round and format the output amount to the correct number of decimal places
    const outputAmountRounded = parseFloat(outputAmountFormatted).toFixed(
      tokenOutDecimals
    );
    console.log("Rounded Output Amount:", outputAmountRounded);

    return outputAmountRounded; // Return rounded output amount
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


// export const Swap = async (amountin, tokenin, tokenout, to) => {
//   console.log();
//   if (!amountin || !tokenin || !tokenout || !to) {
//     console.error("Invalid swap parameters provided.");
//     return;
//   }

//   const provider = window.ethereum
//     ? new ethers.providers.Web3Provider(window.ethereum)
//     : ethers.providers.getDefaultProvider();
//   const signer = provider.getSigner();
//   const contract = new ethers.Contract(contract_address, abi, signer);
//    const tokenInDecimal = new ethers.Contract(tokenin, tokenAbi, signer);

//   try {
//     // Parse amount for swap and define path ending with WETH if required
//      const tokenInDecimals = await tokenInDecimal.decimals();
//     const amountIn = ethers.utils.parseUnits(
//       amountin.toString(),
//       tokenInDecimals
//     );
//     const trustedTokens = ["0x0000000000000000000000000000000000000000"];
//     const maxSteps = 2;

//     const result = await contract.findBestPath(
//       amountIn,
//       tokenin,
//       tokenout,
//       trustedTokens,
//       maxSteps
//     );

//     let { amounts, adapters, path, recipients } = result;

//     // Check if the path needs to end with WETH and adjust if necessary
//     const WETH_ADDRESS = "0x420000000000000000000000000000000000000A"; // Example WETH address, replace if different
//     if (tokenout === WETH_ADDRESS && path[path.length - 1] !== WETH_ADDRESS) {
//       path = [...path, WETH_ADDRESS];
//     }

//     if (
//       !amounts ||
//       !Array.isArray(amounts) ||
//       amounts.length === 0 ||
//       !adapters ||
//       !Array.isArray(adapters) ||
//       !path ||
//       !Array.isArray(path) ||
//       !recipients ||
//       !Array.isArray(recipients)
//     ) {
//       console.error("Invalid trade parameters received:", result);
//       return;
//     }

//     const amountOut = amounts[amounts.length - 1];
//     const tradeParams = { amountIn, amountOut, path, adapters, recipients };

//     // Swap logic based on token addresses
//     let tx;
//     if (
//       tokenin !== "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000" &&
//       tokenout !== "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
//     ) {
//       console.log("Executing token-to-token swap...");
//       tx = await contract.swapNoSplit(tradeParams, 0, to,{gasLimit:1000000});
//     } else if (tokenin === "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000") {
//       console.log("Executing swap from ETH...");
//       tx = await contract.swapNoSplitFromETH(tradeParams, 0, to, {
//         value: amountIn,
//         gasLimit: 1000000,
//       });

//     } else if (tokenout === "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000") {
//       console.log("Executing swap to ETH...");
//       tx = await contract.swapNoSplitToETH(tradeParams, 0, to, {
//         gasLimit: 1000000,
//       });
//     }

//     await tx.wait();
//     console.log("Transaction successful:", tx);
//     return tx;
//   } catch (error) {
//     console.error("Error executing swap:", error);

//     // Check if it's due to gas estimation and provide a potential manual gas limit
//     if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
//       console.error(
//         "Gas estimation failed. You may need to set a manual gas limit."
//       );
//     }
//   }
// };



export const Swap = async (amountin, tokenin, tokenout, to) => {
  if (!amountin || !tokenin || !tokenout || !to) {
    console.error("Invalid swap parameters provided.");
    return;
  }

  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, abi, signer);
  const tokenInDecimal = new ethers.Contract(tokenin, tokenAbi, signer);

  try {
    const tokenInDecimals = await tokenInDecimal.decimals();
    const amountIn = ethers.utils.parseUnits(
      amountin.toString(),
      tokenInDecimals
    );
    const trustedTokens = ["0x0000000000000000000000000000000000000000"];
    const maxSteps = 2;

    const result = await contract.findBestPath(
      amountIn,
      tokenin,
      tokenout,
      trustedTokens,
      maxSteps
    );

    let { amounts, adapters, path, recipients } = result;
    const WETH_ADDRESS = "0x420000000000000000000000000000000000000A";
    if (tokenout === WETH_ADDRESS && path[path.length - 1] !== WETH_ADDRESS) {
      path = [...path, WETH_ADDRESS];
    }

    if (!amounts || !adapters || !path || !recipients) {
      console.error("Invalid trade parameters received:", result);
      return;
    }

    const amountOut = amounts[amounts.length - 1];
    const tradeParams = { amountIn, amountOut, path, adapters, recipients };
    let tx;

    if (
      tokenin !== "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000" &&
      tokenout !== "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
    ) {
      tx = await contract.swapNoSplit(tradeParams, 0, to, {
        gasLimit: 1000000,
      });
    } else if (tokenin === "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000") {
      tx = await contract.swapNoSplitFromETH(tradeParams, 0, to, {
        value: amountIn,
        gasLimit: 1000000,
      });
    } else if (tokenout === "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000") {
      tx = await contract.swapNoSplitToETH(tradeParams, 0, to, {
        gasLimit: 1000000,
      });
    }

    await tx.wait();
    console.log("Transaction successful:", tx);
    return tx;
  } catch (error) {
    console.error("Error executing swap:", error);
    if (error.code === ethers.errors.CALL_EXCEPTION) {
      console.error(
        "CALL_EXCEPTION: Transaction failed. Possible issues with contract parameters or state."
      );
    } else if (error.code === ethers.errors.INSUFFICIENT_FUNDS) {
      console.error("INSUFFICIENT_FUNDS: Check balance and gas requirements.");
    } else if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
      console.error("UNPREDICTABLE_GAS_LIMIT: Try setting a manual gas limit.");
    } else {
      console.error("Unhandled error:", error);
    }
  }
};






// Combined function to get token decimals and format balance
export const getFormattedBalance = async (token, balance) => {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();

  const signer = provider.getSigner();

  // Contract instance for the token
  const tokenContract = new ethers.Contract(token, tokenAbi, signer);
  console.log(balance, "balance of from and to");

  try {
    // Fetch token decimals
    const tokenDecimals = await tokenContract.decimals();

    // Check if balance is valid and not an empty string or non-numeric
    if (!balance || balance === "" || isNaN(balance)) {
      console.warn("Invalid balance:", balance);
      return "0.00000";
    }

    // Use formatUnits to format the balance according to token decimals
    const outputAmountFormatted = ethers.utils.formatUnits(
      balance,
      tokenDecimals
    );
    //console.log("Formatted Output Amount:", outputAmountFormatted);

    // Convert to a number and check for very small balances
    const outputAmountRounded = parseFloat(outputAmountFormatted);
//console.log("Rounded Output Amount:", outputAmountRounded);

    if (outputAmountRounded < 0.00001 && outputAmountRounded > 0) {
      return "<0.00001";
    }

    // Return formatted balance with fixed decimal places
    return outputAmountRounded.toFixed(5); // Adjust decimal places as needed
  } catch (error) {
    console.error("Error fetching decimals or formatting balance:", error);
    return "0.00000"; // Fallback display in case of error
  }
};


// Example usage
// const formattedBalance = await getFormattedBalance(tokenAddress, balance);
// console.log("Formatted Balance:", formattedBalance);

export const getMaxValue = async (token, balance) => {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();

  const signer = provider.getSigner();

  // Contract instance for the token
  const tokenContract = new ethers.Contract(token, tokenAbi, signer);
  console.log(balance, "balance of from and to");

  try {
    // Fetch token decimals
    const tokenDecimals = await tokenContract.decimals();

    // Check if balance is valid and not an empty string or non-numeric
    if (!balance || balance === "" || isNaN(balance)) {
      console.warn("Invalid balance:", balance);
      return "0.00000";
    }

    
    const outputAmountFormatted = ethers.utils.formatUnits(
      balance,
      tokenDecimals
    );
    //console.log("Formatted Output Amount:", outputAmountFormatted);

    
    const outputAmountRounded = parseFloat(outputAmountFormatted);
    //console.log("Rounded Output Amount:", outputAmountRounded);

   

    // Return formatted balance with fixed decimal places
    return outputAmountRounded.toFixed(tokenDecimals); // Adjust decimal places as needed
  } catch (error) {
    console.error("Error fetching decimals or formatting balance:", error);
    return "0.00000"; // Fallback display in case of error
  }
};

export const getDecimal = async (token) => {
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();

  const signer = provider.getSigner();

  const tokenContract = new ethers.Contract(token, tokenAbi, signer);

  try {
    // Fetch token decimals
    const tokenDecimals = await tokenContract.decimals();
    return tokenDecimals; // Return the decimal places
  } catch (error) {
    console.error("Error fetching token decimals:", error);
    return null; // Return null in case of error
  }
};


export const getMaxBalance = async (token) => {
  // Set up the provider and signer
  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider();

  const signer = provider.getSigner();

  // Contract instance for the token
  const tokenContract = new ethers.Contract(token, tokenAbi, signer);

  try {
    // Get the account address
    const accountAddress = await signer.getAddress();

    // Fetch the token balance for the connected account
    const balance = await tokenContract.balanceOf(accountAddress);
    console.log("Raw Balance:", balance.toString());

    // Fetch the decimals for the token
    const tokenDecimals = await tokenContract.decimals();
    console.log("Token Decimals:", tokenDecimals);

    // Format the balance using the token's decimals
    const formattedBalance = ethers.utils.formatUnits(balance, tokenDecimals);
    console.log("Formatted Balance:", formattedBalance);

    return formattedBalance; // You can return this value or set it in state
  } catch (error) {
    console.error("Error fetching balance or decimals:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};