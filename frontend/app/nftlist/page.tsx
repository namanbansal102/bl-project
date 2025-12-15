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
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

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
      name: "Mintverse #002",
      owner: "0xB12...EE4",
      price: "0.18 ETH",
      img: "https://images.unsplash.com/photo-1620121684840-edffcfc4b878"
    },
    {
      name: "Mintverse #003",
      owner: "0xC44...99A",
      price: "0.30 ETH",
      img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead"
    },
    {
      name: "Mintverse #004",
      owner: "0xDD9...77A",
      price: "0.45 ETH",
      img: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c"
    }
  ];

  const closeModal = () => {
    setSelectedNFT(null);
  };

  return (
    <div className="bg-[#0b1020] text-white min-h-screen">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 font-serif text-2xl">
            <Image src="/assets/logo.png" alt="YourChain logo" width={32} height={32} className="object-contain" />
            <span><Link href="/">Mintverse</Link></span>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/10 rounded-lg">All NFTs</button>
            <button className="px-4 py-2 bg-white/10 rounded-lg">Owned</button>
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
              Listed
            </button>

            <select className="bg-white/10 px-4 py-2 rounded-lg text-sm">
              <option className="text-black">Recently Minted</option>
              <option className="text-black">Price: Low to High</option>
              <option className="text-black">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      {/* NFT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {nfts.map((nft, index) => (
            <div key={index} className="nft-card">
              <img src={nft.img} alt={nft.name} className="h-60 w-full object-cover rounded-t-2xl" />
              <div className="p-4 bg-[#12172f] rounded-b-2xl">
                <h3 className="font-semibold">{nft.name}</h3>
                <p className="text-white/60 text-sm">{nft.price}</p>
                <button 
                  onClick={() => setSelectedNFT(nft)}
                  className="mt-3 w-full bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedNFT && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-[#12172f] rounded-2xl max-w-md w-full p-6 relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl hover:text-gray-400 transition"
            >
              ✕
            </button>

            <img 
              src={selectedNFT.img} 
              alt={selectedNFT.name}
              className="h-64 w-full object-cover rounded-xl mb-4" 
            />

            <h2 className="text-2xl font-semibold">{selectedNFT.name}</h2>
            <p className="text-white/60 text-sm mt-1">Owner: {selectedNFT.owner}</p>
            <p className="mt-3 font-medium">Price: {selectedNFT.price}</p>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-indigo-600 py-2 rounded-lg hover:bg-indigo-700 transition">
                Transfer
              </button>
              <button className="flex-1 bg-red-600 py-2 rounded-lg hover:bg-red-700 transition">
                Burn
              </button>
              <button className="flex-1 bg-emerald-600 py-2 rounded-lg hover:bg-emerald-700 transition">
                Sell
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
