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

export const Bridge = async (amount, destinationNetwork, destinationAddress, amountinWei, tokenAddress, forceUpdate, permitData) => {

    console.log("amount",amount,"destinationNetwork", destinationNetwork,"destinationAddress", destinationAddress, "amountinWei",amountinWei, "tokenAddress",tokenAddress, "forceUpdate",forceUpdate, "permitData",permitData);
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
  if(tokenAddress === "0x0000000000000000000000000000000000000000"){
    const tx = await contract.bridgeAsset(
      destinationNetwork, destinationAddress, amountinWei, tokenAddress, forceUpdate, permitData,{
          value:amountinWei,
          gasLimit: 300000         }
        );
      
        await tx.wait();
      
        console.log("tx", tx);
        return tx;
  }
else{
  const tx = await contract.bridgeAsset(
    destinationNetwork, destinationAddress, amountinWei, tokenAddress, forceUpdate, permitData,{
     
        gasLimit: 300000         }
      );
    
      await tx.wait();
    
      console.log("tx", tx);
      return tx;
}
        
 } catch (error) {
    console.log("erior",error);
 }
};
export const ApproveToken = async ( tokenAddress) => {

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
  if(tokenAddress === "0x0000000000000000000000000000000000000000"){
    return
  }
else{
  const tx = await contract.approve(
     
contract_address, "115792089237316195423570985008687907853269984665640564039457574004913129639935"
      );
    
      await tx.wait();
    
      console.log("tx", tx);
      return tx;
}
        
 } catch (error) {
    console.log("erior",error);
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
  const networkFee = gasPrice.mul(gasLimit);  // gasPrice * gasLimit
  console.log("Estimated network fee (in wei):", networkFee.toString());

          return ethers.utils.formatEther(networkFee);

        
 } catch (error) {
    console.log("erior",error);
 }
};
export const GetBalance = async (address, tokenAddress,eth) => {

  console.log("Addres",address,"tokenAddress",tokenAddress, "eth",eth)
  // provider
  if(eth){
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

  console.log("balance in integration:",balance)

  return balance.toString();
} catch (error) {
  console.log("error in error",error);
  
}

  }
  else{
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
export const GetApproval = async (address, tokenAddress,eth) => {

  console.log("Addres",address,"tokenAddress",tokenAddress, "eth",eth)
  // provider

  console.log("in approval");

  if(tokenAddress === "0x0000000000000000000000000000000000000000"){
    return 10000000000
  }
  
  if(!eth){
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
  const balance = await contract.allowance(address,contract_address);

  console.log("Approval:",balance)

  return balance.toString();
} catch (error) {
  console.log("error in error",error);
  
}

  }
  else{
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
  const balance = await contract.allowance(address,contract_address);

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
    //console.log("Raw Output Amount:", outputAmountRaw.toString());

    // Use formatUnits for output amount with the correct decimals
    const outputAmountFormatted = ethers.utils.formatUnits(
      outputAmountRaw,
      tokenOutDecimals
    );
    //console.log("Formatted Output Amount:", outputAmountFormatted);

    // Round and format the output amount to the correct number of decimal places
    const outputAmountRounded = parseFloat(outputAmountFormatted).toFixed(
      tokenOutDecimals
    );
    //console.log("Rounded Output Amount:", outputAmountRounded);

    return outputAmountRounded; // Return rounded output amount
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};











export const Swap = async (amountin, tokenin, tokenout, to) => {
  if (!amountin || !tokenin || !tokenout || !to) {
    console.error("Invalid swap parameters provided.");
    return;
  }

  console.log("Initializing swap...");
  console.log("Amount In:", amountin);
  console.log("From Token Address:", tokenin);
  console.log("To Token Address:", tokenout);
  console.log("Recipient Address:", to);

  const provider = window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contract_address, abi, signer);

  try {
    // Fetching all trade parameters
    const amountIn = ethers.utils.parseUnits(amountin.toString(), 18); // Adjust decimals if needed
    const trustedTokens = ["0x0000000000000000000000000000000000000000"]; // No specific trusted tokens
    const maxSteps = 2; // Maximum number of hops allowed

    // Call the smart contract to find the best path for the swap
    const result = await contract.findBestPath(
      amountIn,
      tokenin,
      tokenout,
      trustedTokens,
      maxSteps
    );

    // Extract trade parameters from the result
    const amounts = result.amounts;
    const adapters = result.adapters;
    const path = [
      "0x420000000000000000000000000000000000000A",
      tokenin,
      tokenout,
    ];
    const recipients = result.recipients;

    console.log(result);

    // Validate trade parameters
    if (
      !amounts ||
      !Array.isArray(amounts) ||
      amounts.length === 0 ||
      !adapters ||
      !Array.isArray(adapters) ||
      !path ||
      !Array.isArray(path) ||
      !recipients ||
      !Array.isArray(recipients)
    ) {
      console.error("Invalid trade parameters received:", result);
      return;
    }

    const amountOut = amounts[amounts.length - 1]; // Final output amount

    // Ensure the path starts with WETH
    
 
    // Proceed with the swap logic
    if (
      tokenin !== "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000" &&
      tokenout !== "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
    ) {
      const tx = await contract.swapNoSplit(
        { amountIn, amountOut, path, adapters, recipients },
        0,
        to
      );
      await tx.wait();
      console.log("Transaction successful:", tx);
      return tx;
    } else if (tokenin === "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000") {
      const tx = await contract.swapNoSplitFromETH(
        { amountIn, amountOut, path, adapters, recipients },
        0,
        to,
        { value: amountIn }
      );
      await tx.wait();
      console.log("Transaction successful:", tx);
      return tx;
    } else if (tokenout === "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000") {
      const tx = await contract.swapNoSplitToETH(
        { amountIn, amountOut, path, adapters, recipients },
        0,
        to
      );
      await tx.wait();
      console.log("Transaction successful:", tx);
      return tx;
    }
  } catch (error) {
    console.error("Error executing swap:", error);
  }
};







