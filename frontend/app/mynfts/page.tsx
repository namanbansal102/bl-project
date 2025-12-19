'use client';
import Link from 'next/link';
import MyNFTsList from '@/components/MyNFTsList';

export default function MyNFTsPage() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
      {/* Animated Background Orbs */}
      <div className="fixed w-96 h-96 bg-indigo-500 top-0 -left-48 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite]" />
      <div className="fixed w-96 h-96 bg-purple-500 bottom-0 -right-48 rounded-full blur-[100px] opacity-30 pointer-events-none z-0 animate-[float_3s_ease-in-out_infinite] [animation-delay:-2s]" />

   

      {/* MAIN CONTENT */}
      <main className="relative z-10 mb-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">NFT</span> Collection
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              View and manage all NFTs you own on the blockchain
            </p>
          </div>

          {/* My NFTs List Component */}
          <MyNFTsList />
        </section>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
