'use client';
import { useState } from 'react';
import { formatEther } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, type NFT } from '@/lib/contract';
import { useMyNFTs } from '@/lib/nft-hooks';

interface MyNFTsListProps {
  onRefresh?: () => void;
}

/**
 * Component to display NFTs owned by the connected wallet
 * Uses the smart contract's viewMyNFTs() function
 */
export default function MyNFTsList({ onRefresh }: MyNFTsListProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [listPrice, setListPrice] = useState('');
  const [showListModal, setShowListModal] = useState(false);

  // Fetch my NFTs using the custom hook
  const { myNFTs, isLoading, isConnected, refetch, getImageUrl } = useMyNFTs();

  // Contract write functions
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Refetch data after transaction confirmation
  useState(() => {
    if (isConfirmed) {
      refetch();
      if (onRefresh) onRefresh();
      setShowListModal(false);
      setSelectedNFT(null);
    }
  });

  const handleListForSale = async () => {
    if (!selectedNFT || !listPrice) return;

    try {
      const priceInWei = parseEther(listPrice);
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'listNFTForSale',
        args: [selectedNFT.id, priceInWei],
      });
    } catch (error) {
      console.error('Error listing NFT:', error);
    }
  };

  const handleUnlistNFT = async (nft: NFT) => {
    try {
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'unlistNFT',
        args: [nft.id],
      });
    } catch (error) {
      console.error('Error unlisting NFT:', error);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-2xl text-white/60 mb-4">Connect Your Wallet</p>
          <p className="text-white/40">Please connect your wallet to view your NFTs</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-4">
          <svg className="w-12 h-12 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-white/60">Loading your NFTs...</p>
        </div>
      </div>
    );
  }

  if (myNFTs.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-2xl text-white/60 mb-4">No NFTs Found</p>
          <p className="text-white/40">You don&apos;t own any NFTs yet</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {myNFTs.map((nft, index) => (
          <div
            key={nft.id.toString()}
            className="group relative rounded-2xl transition-all duration-500 bg-gradient-to-br from-slate-800/90 to-slate-900/80 backdrop-blur-xl border border-white/5 overflow-hidden hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 animate-[fadeInUp_0.6s_ease-out]"
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            <div 
              onClick={() => setSelectedNFT(nft)}
              className="block overflow-hidden rounded-t-2xl h-72 relative cursor-pointer"
            >
              {nft.imageHash ? (
                <img
                  src={getImageUrl(nft)}
                  alt={nft.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-6xl">
                  🖼️
                </div>
              )}
            </div>

            <div className="p-5 space-y-3 relative">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -m-[2px] p-[2px]">
                <div className="w-full h-full bg-gradient-to-br from-slate-800/90 to-slate-900/80 rounded-b-2xl" />
              </div>

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <h3 className="font-bold text-lg mb-1">{nft.name}</h3>
                  <div className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">
                    <span className="text-white/70">
                      {nft.currentOwner.slice(0, 6)}...{nft.currentOwner.slice(-4)}
                    </span>
                  </div>
                </div>
                <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full border border-indigo-500/30">
                  Owned
                </span>
              </div>

              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 p-3 rounded-xl flex items-center justify-between transition-all duration-300 hover:from-indigo-500/40 hover:to-purple-500/40 hover:border-indigo-500/60 hover:scale-105 relative z-10">
                <span className="text-white/70 text-sm">Price</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 320 512">
                    <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                  </svg>
                  <span className="font-bold text-base">{formatEther(nft.price)} ETH</span>
                </div>
              </div>

              {/* Action Button */}
              {nft.isForSale ? (
                <button 
                  onClick={() => handleUnlistNFT(nft)}
                  disabled={isPending || isConfirming}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 disabled:opacity-50"
                >
                  {isPending || isConfirming ? 'Unlisting...' : 'Unlist from Sale'}
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setSelectedNFT(nft);
                    setShowListModal(true);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
                >
                  List for Sale
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* NFT Details Modal */}
      {selectedNFT && !showListModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setSelectedNFT(null)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl max-w-2xl w-full p-8 relative mx-4 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedNFT(null)}
              className="absolute top-4 right-4 text-xl hover:text-gray-400 transition w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden">
                {selectedNFT.imageHash ? (
                  <img 
                    src={getImageUrl(selectedNFT)} 
                    alt={selectedNFT.name}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-6xl">
                    🖼️
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedNFT.name}</h2>
                  <p className="text-white/60 text-sm">ID: #{selectedNFT.id.toString()}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Description</p>
                  <p className="text-white/90">{selectedNFT.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Creator</p>
                    <p className="text-white/90 text-sm font-mono">
                      {selectedNFT.creator.slice(0, 6)}...{selectedNFT.creator.slice(-4)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Owner</p>
                    <p className="text-white/90 text-sm font-mono">
                      {selectedNFT.currentOwner.slice(0, 6)}...{selectedNFT.currentOwner.slice(-4)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Royalties</p>
                    <p className="text-white/90 text-sm font-semibold">{selectedNFT.royalties.toString()}%</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-white/60 text-xs mb-1">Times Sold</p>
                    <p className="text-white/90 text-sm font-semibold">{selectedNFT.timesSold.toString()}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg p-4 border border-indigo-500/30">
                  <p className="text-white/60 text-sm mb-1">Current Price</p>
                  <p className="text-2xl font-bold">{formatEther(selectedNFT.price)} ETH</p>
                </div>

                {selectedNFT.isForSale && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-300 text-sm font-medium">Available for Sale</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List NFT Modal */}
      {showListModal && selectedNFT && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setShowListModal(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 rounded-2xl max-w-md w-full p-8 relative mx-4 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowListModal(false)}
              className="absolute top-4 right-4 text-xl hover:text-gray-400 transition w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6">List NFT for Sale</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-white/80">NFT Name</label>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="font-semibold">{selectedNFT.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/80">Sale Price (ETH)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-400 transition-all text-white"
                />
                <p className="text-xs text-white/40 mt-2">
                  Current price: {formatEther(selectedNFT.price)} ETH
                </p>
              </div>

              <button
                onClick={handleListForSale}
                disabled={!listPrice || isPending || isConfirming}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isConfirming ? 'Listing...' : 'List for Sale'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
