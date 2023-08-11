import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/MetaProject.json"

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [showContractAddress, setShowContractAddress] = useState(false);

  const [buyNFT, setbuyNFT] = useState("");

  const contractAddress = "0x77f98EC6fE91A4A507968C01753B35970c9d8A05";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const toggleContractAddress = () => {
    setShowContractAddress((prevShowContractAddress) => !prevShowContractAddress);
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (atm) {
      getBalance();
    }
  }, [atm]);

  return (
    <main className="container">
      <header>
        <h1>Welcome to my page</h1>
      </header>
      <div className="content">
        {!account ? (
          <button onClick={connectAccount}>Connect your crypto wallet</button>
        ) : (
          <>
            <div className="button-group">
              <button onClick={toggleContractAddress}>
                {showContractAddress ? "Hide Contract Address" : "Show Contract Address"}
              </button>
              {showContractAddress && (
                <div>
                  <p>Wallet Address: {contractAddress}</p>
                </div>
              )}
              <button onClick={deposit}>Deposit Ethereum</button>
              <button onClick={withdraw}>Withdraw Ethereum</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
