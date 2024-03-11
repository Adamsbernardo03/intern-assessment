import { useState, useCallback } from "react";
import { Inter } from "next/font/google";
import { Header } from "../components/header";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export interface AccountType {
  address?: string;
  balance?: string;
  chainId?: string;
  network?: string;
}

export default function Home() {
  const [accountData, setAccountData] = useState<AccountType>({});
  const [message, setMessage] = useState<string>("");

  const _connectToMetaMask = useCallback(async () => {
    const ethereum = window.ethereum;
    // Check if MetaMask is installed
    if (typeof ethereum !== "undefined") {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Get the connected Ethereum address
        const address = accounts[0];
        // Create an ethers.js provider using the injected provider from MetaMask
        const provider = new ethers.BrowserProvider(ethereum);
        // Get the account balance
        const balance = await provider.getBalance(address);
        // Get the network ID from MetaMask
        const network = await provider.getNetwork();
        // Update state with the results
        setAccountData({
          address,
          balance: ethers.formatEther(balance),
          // The chainId property is a bigint, change to a string
          chainId: network.chainId.toString(),
          network: network.name,
        });
      } catch (error: Error | any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);

  const _sendMessageToMetaMask = useCallback(async () => {
    const ethereum = await window.ethereum;
    // Create an ethers.js provider using the injected provider from MetaMask
    // And get the signer (account) from the provider
    const signer = await new ethers.BrowserProvider(ethereum).getSigner();
    try {
      // Sign the message
      await signer.signMessage(message);
    } catch (error) {
      alert("User denied message signature.");
    }
  }, [message]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };


  return (
    <div className="home-page">
      <Header {...accountData} />
      <div className="home-card" style={{ display: "flex", justifyContent: "center" }}>
  
        <div className="flex flex-col justify-center items-center">
          <img src="./imgs/metamask.png" alt="" style={{ width: "100px", height: "auto", paddingBottom: "10px" }} />
          {accountData?.address ? (
            <>
            </>
          ) : (
            <button onClick={_connectToMetaMask} className="bg-white text-black p-4 rounded-lg">Connect to Metamask</button>
          )}
        </div>
  
      </div>
    </div>
  );
}