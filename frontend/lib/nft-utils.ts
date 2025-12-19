import { formatEther } from 'viem';
import { type NFT } from './contract';

/**
 * Utility functions for working with NFT data
 */

/**
 * Format NFT price in ETH with specified decimal places
 */
export function formatNFTPrice(price: bigint, decimals: number = 4): string {
  const ethValue = formatEther(price);
  return parseFloat(ethValue).toFixed(decimals);
}

/**
 * Get a shortened version of an address
 */
export function shortenAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Calculate total value of NFT collection
 */
export function calculateTotalValue(nfts: NFT[]): bigint {
  return nfts.reduce((total, nft) => total + nft.price, 0n);
}

/**
 * Filter NFTs by status
 */
export function filterNFTsByStatus(nfts: NFT[], status: 'listed' | 'unlisted' | 'all'): NFT[] {
  if (status === 'listed') {
    return nfts.filter(nft => nft.isForSale);
  }
  if (status === 'unlisted') {
    return nfts.filter(nft => !nft.isForSale);
  }
  return nfts;
}

/**
 * Sort NFTs by various criteria
 */
export function sortNFTs(
  nfts: NFT[], 
  sortBy: 'price-asc' | 'price-desc' | 'recent' | 'times-sold'
): NFT[] {
  const sortedNFTs = [...nfts];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedNFTs.sort((a, b) => Number(a.price - b.price));
    case 'price-desc':
      return sortedNFTs.sort((a, b) => Number(b.price - a.price));
    case 'recent':
      return sortedNFTs.sort((a, b) => Number(b.id - a.id));
    case 'times-sold':
      return sortedNFTs.sort((a, b) => Number(b.timesSold - a.timesSold));
    default:
      return sortedNFTs;
  }
}

/**
 * Get NFT statistics
 */
export function getNFTStats(nfts: NFT[]) {
  const totalNFTs = nfts.length;
  const listedNFTs = nfts.filter(nft => nft.isForSale).length;
  const unlistedNFTs = totalNFTs - listedNFTs;
  const totalValue = calculateTotalValue(nfts);
  const averagePrice = totalNFTs > 0 ? totalValue / BigInt(totalNFTs) : 0n;
  const highestPrice = totalNFTs > 0 ? nfts.reduce((max, nft) => nft.price > max ? nft.price : max, 0n) : 0n;
  const lowestPrice = totalNFTs > 0 ? nfts.reduce((min, nft) => nft.price < min ? nft.price : min, nfts[0]?.price || 0n) : 0n;
  
  return {
    totalNFTs,
    listedNFTs,
    unlistedNFTs,
    totalValue,
    averagePrice,
    highestPrice,
    lowestPrice,
    totalSales: nfts.reduce((sum, nft) => sum + nft.timesSold, 0n),
  };
}

/**
 * Check if an address owns a specific NFT
 */
export function isOwner(nft: NFT, address?: string): boolean {
  if (!address) return false;
  return nft.currentOwner.toLowerCase() === address.toLowerCase();
}

/**
 * Check if an address created a specific NFT
 */
export function isCreator(nft: NFT, address?: string): boolean {
  if (!address) return false;
  return nft.creator.toLowerCase() === address.toLowerCase();
}

/**
 * Get NFT image URL (handles IPFS and HTTP URLs)
 */
export function getNFTImageUrl(imageHash: string, signedUrls?: Record<string, string>, nftId?: string): string {
  // Check for signed URL first
  if (nftId && signedUrls && signedUrls[nftId]) {
    return signedUrls[nftId];
  }
  
  // Handle IPFS URLs
  if (imageHash.startsWith('ipfs://')) {
    return imageHash.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  
  // Return HTTP URLs as-is
  if (imageHash.startsWith('http')) {
    return imageHash;
  }
  
  // Default fallback
  return imageHash;
}

/**
 * Calculate royalty amount for a sale
 */
export function calculateRoyalty(price: bigint, royaltyPercentage: bigint): bigint {
  return (price * royaltyPercentage) / 100n;
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Search NFTs by name or description
 */
export function searchNFTs(nfts: NFT[], searchTerm: string): NFT[] {
  const term = searchTerm.toLowerCase();
  return nfts.filter(nft => 
    nft.name.toLowerCase().includes(term) || 
    nft.description.toLowerCase().includes(term)
  );
}

/**
 * Group NFTs by creator
 */
export function groupNFTsByCreator(nfts: NFT[]): Map<string, NFT[]> {
  const grouped = new Map<string, NFT[]>();
  
  nfts.forEach(nft => {
    const creator = nft.creator;
    if (!grouped.has(creator)) {
      grouped.set(creator, []);
    }
    grouped.get(creator)!.push(nft);
  });
  
  return grouped;
}

/**
 * Get NFTs with specific royalty range
 */
export function filterByRoyaltyRange(nfts: NFT[], minRoyalty: bigint, maxRoyalty: bigint): NFT[] {
  return nfts.filter(nft => nft.royalties >= minRoyalty && nft.royalties <= maxRoyalty);
}

/**
 * Get NFTs within price range
 */
export function filterByPriceRange(nfts: NFT[], minPrice: bigint, maxPrice: bigint): NFT[] {
  return nfts.filter(nft => nft.price >= minPrice && nft.price <= maxPrice);
}
