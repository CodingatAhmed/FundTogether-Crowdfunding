import React, { useState } from "react";

const WalletApp: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);

  const formatAddress = (address: string) =>
    `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  const connectWallet = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockAddress = "0x1A2b3C4d5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T";
      const mockBalance = (Math.random() * 5).toFixed(4);
      setWalletAddress(mockAddress);
      setWalletBalance(mockBalance);
      setIsConnected(true);
      setIsLoading(false);
    }, 1500);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    setWalletBalance("0.00");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="relative w-full max-w-lg bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-4000"></div>

        {/* Header */}
        <div className="z-10 text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
            DeFi Wallet
          </h1>
          <p className="mt-2 text-gray-400 text-lg">
            Manage tokens, send & receive securely.
          </p>
        </div>

        {/* Main content */}
        <div className="z-10 w-full">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center p-6">
              <div className="bg-gray-700 p-8 rounded-full mb-6 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 text-indigo-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 
                       3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 
                       0v6.75A2.25 2.25 0 0 1 18.75 
                       21H5.25A2.25 2.25 0 0 1 3 18.75V12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4">
                Connect your wallet to begin
              </h2>
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className={`w-full max-w-sm flex items-center justify-center px-6 py-4 font-bold rounded-xl transition-all duration-300 
                  ${isLoading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"}`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 
                          0 0 5.373 0 12h4zm2 
                          5.291A7.962 7.962 0 014 
                          12H0c0 3.042 1.135 
                          5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Wallet Info */}
              <div className="bg-gray-700 p-6 rounded-2xl shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400">
                    Wallet Address
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-lg font-mono">{formatAddress(walletAddress)}</p>
              </div>

              {/* Balance */}
              <div className="bg-gray-700 p-6 rounded-2xl shadow-inner text-center">
                <p className="text-green-400 font-bold">Balance</p>
                <p className="text-4xl font-extrabold">{walletBalance} ETH</p>
              </div>

              {/* Token List */}
              <div className="bg-gray-700 p-6 rounded-2xl shadow-inner">
                <h3 className="text-lg font-bold mb-3">Your Assets</h3>
                <div className="flex justify-between py-2 border-b border-gray-600">
                  <span>Ethereum</span>
                  <span>{walletBalance} ETH</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-600">
                  <span>USDC</span>
                  <span>120.50</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>DAI</span>
                  <span>89.30</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowSend(true)}
                  className="bg-blue-600 hover:bg-blue-700 font-bold py-3 px-6 rounded-xl active:scale-95"
                >
                  Send
                </button>
                <button
                  onClick={() => setShowReceive(true)}
                  className="bg-teal-600 hover:bg-teal-700 font-bold py-3 px-6 rounded-xl active:scale-95"
                >
                  Receive
                </button>
              </div>

              {/* Disconnect */}
              <button
                onClick={disconnectWallet}
                className="w-full bg-red-600 hover:bg-red-700 font-bold py-3 px-6 rounded-xl active:scale-95"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Send Modal */}
      {showSend && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Send Tokens</h2>
            <input
              type="text"
              placeholder="Recipient Address"
              className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-3 rounded-lg bg-gray-700 text-white mb-3"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSend(false)}
                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {showReceive && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">Receive Tokens</h2>
            <p className="text-gray-400 mb-4">
              Share your wallet address to receive funds
            </p>
            <div className="p-4 bg-gray-700 rounded-lg font-mono">
              {walletAddress}
            </div>
            <button
              onClick={() => setShowReceive(false)}
              className="mt-4 px-4 py-2 bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletApp;
