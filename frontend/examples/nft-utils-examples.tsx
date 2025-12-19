// Example: How to enhance your NFT list page with utility functions

import { useMyNFTs, useAllNFTs } from '@/lib/nft-hooks';
import { 
  getNFTStats, 
  formatNFTPrice, 
  sortNFTs, 
  filterNFTsByStatus,
  searchNFTs,
  shortenAddress 
} from '@/lib/nft-utils';
import { useState } from 'react';

export default function EnhancedNFTListExample() {
  const { myNFTs, isLoading } = useMyNFTs();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'recent'>('recent');
  const [filter, setFilter] = useState<'all' | 'listed' | 'unlisted'>('all');

  // Apply filters
  const filteredNFTs = filterNFTsByStatus(myNFTs, filter);
  
  // Apply search
  const searchedNFTs = searchTerm 
    ? searchNFTs(filteredNFTs, searchTerm)
    : filteredNFTs;
  
  // Apply sorting
  const sortedNFTs = sortNFTs(searchedNFTs, sortBy);

  // Get statistics
  const stats = getNFTStats(myNFTs);

  return (
    <div className="p-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-white/60 text-sm">Total NFTs</p>
          <p className="text-2xl font-bold">{stats.totalNFTs}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-white/60 text-sm">Listed</p>
          <p className="text-2xl font-bold">{stats.listedNFTs}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-white/60 text-sm">Total Value</p>
          <p className="text-2xl font-bold">{formatNFTPrice(stats.totalValue)} ETH</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-white/60 text-sm">Average Price</p>
          <p className="text-2xl font-bold">{formatNFTPrice(stats.averagePrice)} ETH</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search NFTs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-slate-800 px-4 py-2 rounded-lg text-white border border-white/10 focus:border-indigo-400 focus:outline-none"
        />

        {/* Filter */}
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as any)}
          className="bg-slate-800 px-4 py-2 rounded-lg text-white border border-white/10"
        >
          <option value="all">All NFTs</option>
          <option value="listed">Listed</option>
          <option value="unlisted">Unlisted</option>
        </select>

        {/* Sort */}
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-slate-800 px-4 py-2 rounded-lg text-white border border-white/10"
        >
          <option value="recent">Recently Added</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="price-asc">Price: Low to High</option>
        </select>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-4 gap-6">
        {sortedNFTs.map((nft) => (
          <div key={nft.id.toString()} className="bg-slate-800 rounded-lg overflow-hidden">
            <img 
              src={getImageUrl(nft)} 
              alt={nft.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-white mb-2">{nft.name}</h3>
              <p className="text-white/60 text-sm mb-2">
                {shortenAddress(nft.currentOwner)}
              </p>
              <p className="text-indigo-400 font-bold">
                {formatNFTPrice(nft.price)} ETH
              </p>
              {nft.isForSale && (
                <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                  For Sale
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example 2: Simple NFT Stats Component
export function NFTStatsWidget() {
  const { myNFTs } = useMyNFTs();
  const stats = getNFTStats(myNFTs);

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Your Collection</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total NFTs:</span>
          <span className="font-bold">{stats.totalNFTs}</span>
        </div>
        <div className="flex justify-between">
          <span>Listed:</span>
          <span className="font-bold">{stats.listedNFTs}</span>
        </div>
        <div className="flex justify-between">
          <span>Portfolio Value:</span>
          <span className="font-bold">{formatNFTPrice(stats.totalValue)} ETH</span>
        </div>
        <div className="flex justify-between">
          <span>Total Sales:</span>
          <span className="font-bold">{stats.totalSales.toString()}</span>
        </div>
      </div>
    </div>
  );
}

// Example 3: NFT Search Component
export function NFTSearch() {
  const { myNFTs } = useMyNFTs();
  const [query, setQuery] = useState('');
  const results = searchNFTs(myNFTs, query);

  return (
    <div>
      <input
        type="text"
        placeholder="Search your NFTs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-white/10"
      />
      
      {query && (
        <div className="mt-4">
          <p className="text-white/60 mb-4">Found {results.length} results</p>
          <div className="grid grid-cols-3 gap-4">
            {results.map(nft => (
              <div key={nft.id.toString()} className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold">{nft.name}</h3>
                <p className="text-sm text-white/60">{formatNFTPrice(nft.price)} ETH</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Example 4: Price Range Filter
export function PriceRangeFilter() {
  const { myNFTs } = useMyNFTs();
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('1');
  
  const filtered = myNFTs.filter(nft => {
    const price = parseFloat(formatEther(nft.price));
    return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div>
          <label className="text-sm text-white/60">Min Price (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 rounded-lg text-white border border-white/10"
          />
        </div>
        <div>
          <label className="text-sm text-white/60">Max Price (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 rounded-lg text-white border border-white/10"
          />
        </div>
      </div>
      <p className="text-white/60">{filtered.length} NFTs in this price range</p>
    </div>
  );
}
