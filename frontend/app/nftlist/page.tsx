// 'use client';
// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// interface NFT {
//   name: string;
//   owner: string;
//   price: string;
//   img: string;
// }

// export default function NFTList() {
//   const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

//   const nfts: NFT[] = [
//     {
//       name: "Mintverse #001",
//       owner: "0xA23...91D",
//       price: "0.25 ETH",
//       img: "https://the-nft-generator.com/images/design-services/carrousel/13.jpg"
//     },
//     {
//       name: "Mintverse #002",
//       owner: "0xB12...EE4",
//       price: "0.18 ETH",
//       img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/8f7b9c149661313.62eb722f93a89.png"
//     },
//     {
//       name: "Mintverse #002",
//       owner: "0xB12...EE4",
//       price: "0.18 ETH",
//       img: "https://images.unsplash.com/photo-1620121684840-edffcfc4b878"
//     },
//     {
//       name: "Mintverse #003",
//       owner: "0xC44...99A",
//       price: "0.30 ETH",
//       img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead"
//     },
//     {
//       name: "Mintverse #004",
//       owner: "0xDD9...77A",
//       price: "0.45 ETH",
//       img: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c"
//     }
//   ];

//   const closeModal = () => {
//     setSelectedNFT(null);
//   };

//   return (
//     <div className="bg-[#0b1020] text-white min-h-screen">
//       {/* HEADER */}
//       <header className="border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
//           <div className="flex items-center gap-3 font-serif text-2xl">
//             <Image src="/assets/logo.png" alt="YourChain logo" width={32} height={32} className="object-contain" />
//             <span><Link href="/">Mintverse</Link></span>
//           </div>
//           <div className="flex gap-3">
//             <button className="px-4 py-2 bg-white/10 rounded-lg">All NFTs</button>
//             <button className="px-4 py-2 bg-white/10 rounded-lg">Owned</button>
//             <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
//               Listed
//             </button>

//             <select className="bg-white/10 px-4 py-2 rounded-lg text-sm">
//               <option className="text-black">Recently Minted</option>
//               <option className="text-black">Price: Low to High</option>
//               <option className="text-black">Price: High to Low</option>
//             </select>
//           </div>
//         </div>
//       </header>

//       {/* NFT GRID */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {nfts.map((nft, index) => (
//             <div key={index} className="nft-card">
//               <img src={nft.img} alt={nft.name} className="h-60 w-full object-cover rounded-t-2xl" />
//               <div className="p-4 bg-[#12172f] rounded-b-2xl">
//                 <h3 className="font-semibold">{nft.name}</h3>
//                 <p className="text-white/60 text-sm">{nft.price}</p>
//                 <button 
//                   onClick={() => setSelectedNFT(nft)}
//                   className="mt-3 w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition"
//                 >
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* MODAL */}
//       {selectedNFT && (
//         <div 
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div 
//             className="bg-[#12172f] rounded-2xl max-w-md w-full p-6 relative mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button 
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-xl hover:text-gray-400 transition"
//             >
//               ✕
//             </button>

//             <img 
//               src={selectedNFT.img} 
//               alt={selectedNFT.name}
//               className="h-64 w-full object-cover rounded-xl mb-4" 
//             />

//             <h2 className="text-2xl font-semibold">{selectedNFT.name}</h2>
//             <p className="text-white/60 text-sm mt-1">Owner: {selectedNFT.owner}</p>
//             <p className="mt-3 font-medium">Price: {selectedNFT.price}</p>

//             <div className="flex gap-3 mt-6">
//               <button className="flex-1 bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition">
//                 Transfer
//               </button>
//               <button className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700 transition">
//                 Burn
//               </button>
//               <button className="flex-1 bg-emerald-600 py-2 rounded-lg hover:bg-emerald-700 transition">
//                 Sell
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, type NFT } from '@/lib/contract';
import { fetchImageUrl } from '@/lib/pinata';
import Navbar from '@/components/Navbar';

type FilterType = 'All NFTs' | 'Owned' | 'Listed';

export default function NFTList() {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All NFTs');
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [listPrice, setListPrice] = useState('');
  const [showListModal, setShowListModal] = useState(false);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const { address, isConnected } = useAccount();

  // Read all NFTs
  const { data: allNFTs, isLoading: loadingAll, refetch: refetchAll } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'viewAllNFTs',
  });

  // Read my NFTs
  const { data: myNFTs, isLoading: loadingMy, refetch: refetchMy } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'viewMyNFTs',
    account: address,
  });

  // Read NFTs for sale
  const { data: forSaleNFTs, isLoading: loadingForSale, refetch: refetchForSale } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'viewNFTsForSale',
  });

  // Contract write functions
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Refetch data after transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
      refetchAll();
      refetchMy();
      refetchForSale();
      setShowListModal(false);
      setSelectedNFT(null);
    }
  }, [isConfirmed]);

  // Fetch image URLs from Pinata for all NFTs
  useEffect(() => {
    const fetchImages = async () => {
      const displayNFTs = getDisplayNFTs();
      const newImageUrls: Record<string, string> = {};
      
      for (const nft of displayNFTs) {
        const imageHash = nft.imageHash;
        // Extract CID from ipfs:// URL
        if (imageHash.startsWith('ipfs://')) {
          const cid = imageHash.replace('ipfs://', '');
          try {
            const signedUrl = await fetchImageUrl(cid);
            if (signedUrl) {
              newImageUrls[nft.id.toString()] = signedUrl;
            }
          } catch (error) {
            console.error(`Error fetching image for NFT ${nft.id}:`, error);
          }
        } else if (imageHash.startsWith('http')) {
          // Use the URL directly if it's already an HTTP URL
          newImageUrls[nft.id.toString()] = imageHash;
        }
      }
      
      setImageUrls(prev => ({ ...prev, ...newImageUrls }));
    };
    
    fetchImages();
  }, [allNFTs, myNFTs, forSaleNFTs, selectedFilter]);

  const getDisplayNFTs = (): NFT[] => {
    if (selectedFilter === 'All NFTs') {
      return (allNFTs as NFT[]) || [];
    } else if (selectedFilter === 'Owned') {
      return (myNFTs as NFT[]) || [];
    } else {
      return (forSaleNFTs as NFT[]) || [];
    }
  };

  const handleBuyNFT = async (nft: NFT) => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    try {
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: 'buyNFT',
        args: [nft.id],
        value: nft.price,
      });
    } catch (error) {
      console.error('Error buying NFT:', error);
    }
  };

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

  const isMyNFT = (nft: NFT): boolean => {
    return isConnected && address?.toLowerCase() === nft.currentOwner.toLowerCase();
  };

  const getImageUrl = (nft: NFT): string => {
    // First, check if we have a signed URL from Pinata
    const signedUrl = imageUrls[nft.id.toString()];
    if (signedUrl) return signedUrl;
    
    // Fallback to direct IPFS gateway
    if (nft.imageHash.startsWith('ipfs://')) {
      return nft.imageHash.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    
    // Return as-is if it's already an HTTP URL
    return nft.imageHash;
  };

  const displayNFTs = getDisplayNFTs();
  const isLoading = loadingAll || loadingMy || loadingForSale;

  const filterOptions: FilterType[] = ['All NFTs', 'Owned', 'Listed'];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen relative overflow-x-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed w-96 h-96 bg-indigo-500 top-0 -left-48 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite]" />
      <div className="fixed w-96 h-96 bg-purple-500 bottom-0 -right-48 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite] [animation-delay:-2s]" />
      <div className="fixed w-80 h-80 bg-pink-500 top-1/2 left-1/2 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite] [animation-delay:-4s]" />

      {/* HEADER */}
    <Navbar></Navbar>
      {/* MAIN CONTENT */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 shadow-indigo-500/50">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Unique</span> NFTs
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover, collect, and trade extraordinary digital assets on the blockchain
          </p>
        </section>

        {/* NFT GRID */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <svg className="w-12 h-12 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-white/60">Loading NFTs...</p>
              </div>
            </div>
          ) : displayNFTs.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-2xl text-white/60 mb-4">No NFTs found</p>
                <p className="text-white/40">
                  {selectedFilter === 'Owned' && 'You don\'t own any NFTs yet'}
                  {selectedFilter === 'Listed' && 'No NFTs are currently listed for sale'}
                  {selectedFilter === 'All NFTs' && 'No NFTs have been created yet'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayNFTs.map((nft, index) => (
                <div
                  key={nft.id.toString()}
                  className="group relative rounded-2xl transition-all duration-500 bg-gradient-to-br from-slate-800/90 to-slate-900/80 backdrop-blur-xl border border-white/5 overflow-hidden hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 animate-[fadeInUp_0.6s_ease-out]"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div 
                    onClick={() => setSelectedNFT(nft)}
                    className="block overflow-hidden rounded-t-2xl h-72 relative cursor-pointer"
                  >
                    {nft.imageHash.startsWith('ipfs://') || nft.imageHash.startsWith('http') ? (
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
                    {/* Gradient Border Effect on Bottom Part Only */}
                    <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -m-[2px] p-[2px]">
                      <div className="w-full h-full bg-gradient-to-br from-slate-800/90 to-slate-900/80 rounded-b-2xl" />
                    </div>

                    <div className="flex items-start justify-between relative z-10">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{nft.name}</h3>
                        <div className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-xs border border-white/10">
                          <svg className="w-3 h-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span className="text-white/70">
                            {nft.currentOwner.slice(0, 6)}...{nft.currentOwner.slice(-4)}
                          </span>
                        </div>
                      </div>
                      {isMyNFT(nft) && (
                        <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full border border-indigo-500/30">
                          Owned
                        </span>
                      )}
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
                    {isMyNFT(nft) ? (
                      nft.isForSale ? (
                        <button 
                          onClick={() => handleUnlistNFT(nft)}
                          disabled={isPending || isConfirming}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 disabled:opacity-50"
                        >
                          Unlist from Sale
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
                      )
                    ) : nft.isForSale ? (
                      <button 
                        onClick={() => handleBuyNFT(nft)}
                        disabled={!isConnected || isPending || isConfirming}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 relative z-10 disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Buy Now
                      </button>
                    ) : (
                      <button 
                        onClick={() => setSelectedNFT(nft)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 font-semibold shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 relative z-10"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

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
                {selectedNFT.imageHash.startsWith('ipfs://') || selectedNFT.imageHash.startsWith('http') ? (
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-400 transition-all"
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
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
    </div>
  );
}
