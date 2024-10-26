import React from "react";
import "./App.css";
import Swap from "./components/Swap";
import Token from "./components/Token";
import TransactionSwap from "./components/TransactionSwap";
import TranscationCompleted from "./components/TranscationCompleted";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { metis } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [metis],
  ssr: true,
});

function App() {
  

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={[metis]}
          modalSize="compact" // Apply the responsive modal size
          theme={darkTheme()}
          showRecentTransactions={true} // Optional: show recent transactions
          showWalletInfo={false} // Hides "What is a Wallet?" info
        >
          <div className="h-screen font-custom flex justify-center items-center p-2 ">
            <Swap />
            {/* <TransactionSwap/> */}
            {/* <TranscationCompleted/> */}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
