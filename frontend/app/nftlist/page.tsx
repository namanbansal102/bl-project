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
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NFT {
  name: string;
  owner: string;
  price: string;
  img: string;
}

export default function NFTList() {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All NFTs');

  const nfts: NFT[] = [
    {
      name: "Mintverse #001",
      owner: "0xA23...91D",
      price: "0.25 ETH",
      img: "https://the-nft-generator.com/images/design-services/carrousel/13.jpg"
    },
    {
      name: "Mintverse #002",
      owner: "0xB12...EE4",
      price: "0.18 ETH",
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/8f7b9c149661313.62eb722f93a89.png"
    },
    {
      name: "Mintverse #003",
      owner: "0xB12...EE4",
      price: "0.22 ETH",
      img: "https://images.unsplash.com/photo-1620121684840-edffcfc4b878"
    },
    {
      name: "Mintverse #004",
      owner: "0xC44...99A",
      price: "0.30 ETH",
      img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead"
    },
    {
      name: "Mintverse #005",
      owner: "0xDD9...77A",
      price: "0.45 ETH",
      img: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c"
    }
  ];

  const filterOptions = ['All NFTs', 'Owned', 'Listed'];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen relative overflow-x-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed w-96 h-96 bg-indigo-500 top-0 -left-48 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite]" />
      <div className="fixed w-96 h-96 bg-purple-500 bottom-0 -right-48 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite] [animation-delay:-2s]" />
      <div className="fixed w-80 h-80 bg-pink-500 top-1/2 left-1/2 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite] [animation-delay:-4s]" />

      {/* HEADER */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-slate-900/60 relative z-20 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 font-serif text-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
              🌟
            </div>
            <span>
              <Link href="/" className="hover:text-indigo-400 transition-colors">
                Mint<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Verse</span>
              </Link>
            </span>
          </div>

          {/* Right Side: Stats, Filter, Sort, Create */}
          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-4 text-sm mr-2">
              <div className="flex items-center gap-2">
                <span className="text-white/50">Volume:</span>
                <span className="font-bold text-indigo-400">840 ETH</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-white/50">Floor:</span>
                <span className="font-bold text-purple-400">0.15 ETH</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-white/50">Items:</span>
                <span className="font-bold text-pink-400">2,547</span>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-lg font-medium transition-all text-sm border border-white/10"
              >
                <span>{selectedFilter}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${filterMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {filterMenuOpen && (
                <div className="absolute top-full mt-2 right-0 w-40 bg-slate-800/95 backdrop-blur-xl rounded-lg border border-white/10 shadow-xl overflow-hidden">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFilter(option);
                        setFilterMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-white/10 transition-colors text-sm font-medium border-b border-white/5 last:border-b-0 ${
                        selectedFilter === option ? 'bg-indigo-500/20' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <select className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 hover:border-indigo-400 focus:border-indigo-400 focus:outline-none transition-all cursor-pointer">
              <option value="recent" className="bg-slate-800 text-white">Recently Minted</option>
              <option value="low" className="bg-slate-800 text-white">Price: Low to High</option>
              <option value="high" className="bg-slate-800 text-white">Price: High to Low</option>
            </select>

            {/* Create Button */}
            <Link
              href="/createnft"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all font-medium shadow-lg hover:shadow-indigo-500/50 hover:scale-105 text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create
            </Link>
          </div>
        </div>
      </header>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="group relative rounded-2xl transition-all duration-500 bg-gradient-to-br from-slate-800/90 to-slate-900/80 backdrop-blur-xl border border-white/5 overflow-hidden hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <Link href="/nft-detail" className="block overflow-hidden rounded-t-2xl h-72 relative">
                  <img
                    src={nft.img}
                    alt={nft.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                </Link>

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
                        <span className="text-white/70">{nft.owner}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 p-3 rounded-xl flex items-center justify-between transition-all duration-300 hover:from-indigo-500/40 hover:to-purple-500/40 hover:border-indigo-500/60 hover:scale-105 relative z-10">
                    <span className="text-white/70 text-sm">Price</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 320 512">
                        <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                      </svg>
                      <span className="font-bold text-base">{nft.price}</span>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 relative z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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
