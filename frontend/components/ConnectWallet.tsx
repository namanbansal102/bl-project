'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-sm transition text-white">
        Connect Wallet
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg border border-green-500/20">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm transition text-white"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Find MetaMask connector (injected)
  const metamaskConnector = connectors.find((c) => c.id === 'injected');

  return (
    <button
      onClick={() => {
        if (metamaskConnector) {
          connect({ connector: metamaskConnector });
        }
      }}
      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-sm transition text-white"
    >
      Connect Wallet
    </button>
  );
}
