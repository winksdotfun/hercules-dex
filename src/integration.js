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

  console.log("getting out");
  

  console.log("ammount",amountIn);
  console.log("tokenIn",tokenIn);
  console.log("tokenOut",tokenOut);
  
// provider
const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();
console.log("provider", provider);

const blockno = await provider.getBlockNumber()
//signer

const signer = provider.getSigner();
GetOutAmount
console.log("signer", signer);
// contract instance



const contract = new ethers.Contract(contract_address, abi, signer);

console.log("contract", contract);

// console.log("asadsasf",contract.queryNoSplit());


try {
  // const tx = await contract.queryNoSplit(  blockno    );
    
    const val = ethers.utils.parseEther(amountIn)
  const tx = await contract.queryAdapter(  val, tokenIn, tokenOut, 1    );
    
    
    
      console.log("tx", tx);
      return tx[0].toString();


      
} catch (error) {
  console.log("erior",error);
}
};

export const Swap = async () => {

  console.log("getting swap");
  

  
// provider
const provider =
  window.ethereum != null
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.providers.getDefaultProvider();
console.log("provider", provider);

const blockno = await provider.getBlockNumber()
//signer

const signer = provider.getSigner();
GetOutAmount
console.log("signer", signer);
// contract instance

const contract = new ethers.Contract(contract_address, abi, signer);

console.log("contract", contract);

// console.log("asadsasf",contract.queryNoSplit());


try {
  // const tx = await contract.queryNoSplit(  blockno    );
    
  const tx = await contract.swapNoSplitToETH(  [100,2302329397750,["0xEA32A96608495e54156Ae48931A7c20f0dcc1a21","0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481"],["0xfccb98649Cb44B9729e04ef1Adb41359d3f4699a",],["0xEf874FeDe49CF49940E8C472f3e58E75ea65b34c",]],"0","0x2B258418ee8ba6822472F722bC558Ce62D42280D"  );
    
    
    
      console.log("tx", tx);
      return tx


      
} catch (error) {
  console.log("erior",error);
}
};