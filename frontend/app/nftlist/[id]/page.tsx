'use client';

import { useState } from 'react';

export default function NFTDetailPage() {
  const [activeTab, setActiveTab] = useState<'details' | 'orders' | 'activity'>(
    'details'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#111827] to-[#0b1020] text-white overflow-hidden flex items-center justify-center">
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        {/* CARD */}
        <div className="w-full max-w-6xl rounded-2xl bg-[#0e1324] border border-white/10 shadow-2xl overflow-hidden">
          {/* ================= TOP BAR ================= */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center">
                ←
              </button>

              <div className="flex gap-2">
                <img
                  className="w-10 h-10 rounded-lg border border-purple-500/50"
                  src="https://i.seadn.io/gae/1.png"
                  alt=""
                />
                <img
                  className="w-10 h-10 rounded-lg opacity-70 hover:opacity-100"
                  src="https://i.seadn.io/gae/2.png"
                  alt=""
                />
                <img
                  className="w-10 h-10 rounded-lg opacity-70 hover:opacity-100"
                  src="https://i.seadn.io/gae/3.png"
                  alt=""
                />
              </div>

              <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center">
                →
              </button>
            </div>

            {/* RIGHT */}
            <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center">
              ✕
            </button>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-8 p-6">
            {/* IMAGE */}
            <div
              className="rounded-xl p-4 flex items-center justify-center
              bg-gradient-to-br from-[#1e1b4b]/40 via-[#111827]/60 to-[#0b1020]/60
              border border-purple-500/20"
            >
              <img
                src="https://images.unsplash.com/photo-1634973357973-f2ed2657db3c"
                className="rounded-xl max-h-[520px]"
                alt="NFT"
              />
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col overflow-hidden">
              <div className="overflow-y-auto max-h-[540px] pr-3 space-y-6">
                {/* TITLE */}
                <div>
                  <h1 className="text-3xl font-bold">Mintverse #005</h1>

                  <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                    <span className="font-semibold text-white">MintVerse</span>
                    <span>•</span>
                    <span>
                      Owned by{' '}
                      <span className="text-purple-400">0xDD9...77A</span>
                    </span>
                  </div>

                  {/* ICONS */}
                  <div className="flex gap-4 mt-3 text-slate-400">
                    <button className="hover:text-white">🌐</button>
                    <button className="hover:text-white">📨</button>
                    <button className="hover:text-white">📋</button>
                    <button className="hover:text-white">❤</button>
                  </div>

                  {/* TAGS */}
                  <div className="flex gap-2 mt-4 text-xs">
                    <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                      ERC721
                    </span>
                    <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                      ETH
                    </span>
                    <span className="px-3 py-1 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                      TOKEN #005
                    </span>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Top Offer</p>
                    <p className="font-semibold">0.42 ETH</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Floor</p>
                    <p className="font-semibold">0.15 ETH</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Rarity</p>
                    <p className="font-semibold text-purple-400">#2,547</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Last Sale</p>
                    <p className="font-semibold">0.44 ETH</p>
                  </div>
                </div>

                {/* BUY */}
                <div className="bg-[#111827] border border-purple-500/20 rounded-xl p-5">
                  <p className="text-xs text-slate-400 mb-2">Buy for</p>

                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-4xl font-bold">0.45 ETH</p>
                    <span className="text-slate-400">($1,420)</span>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:to-purple-800">
                      Buy now
                    </button>
                    <button className="flex-1 py-3 rounded-xl border border-purple-500/40 hover:bg-purple-500/10">
                      Make offer
                    </button>
                  </div>
                </div>

                {/* TABS */}
                <div className="flex gap-8 border-b border-white/10 text-sm">
                  {['details', 'orders', 'activity'].map(tab => (
                    <button
                      key={tab}
                      onClick={() =>
                        setActiveTab(tab as 'details' | 'orders' | 'activity')
                      }
                      className={`pb-3 ${
                        activeTab === tab
                          ? 'border-b-2 border-white font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* DETAILS */}
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    {[
                      'Price history',
                      'Traits',
                      'About',
                      'Blockchain details',
                    ].map(title => (
                      <details
                        key={title}
                        className="bg-[#111827] rounded-xl p-4"
                      >
                        <summary className="font-semibold cursor-pointer">
                          {title}
                        </summary>
                        <div className="mt-3 text-slate-400">
                          {title} placeholder
                        </div>
                      </details>
                    ))}
                  </div>
                )}

                {/* ORDERS */}
                {activeTab === 'orders' && (
                  <div className="bg-[#111827] rounded-xl p-8 text-center text-slate-400">
                    No active orders yet
                  </div>
                )}

                {/* ACTIVITY */}
                {activeTab === 'activity' && (
                  <div className="bg-[#111827] rounded-xl p-8 text-center text-slate-400">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
