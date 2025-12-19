import { useAccount, useReadContract } from 'wagmi';
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, type NFT } from './contract';
import { useState, useEffect } from 'react';
import { fetchImageUrl } from './pinata';

/**
 * Hook to fetch NFTs owned by the connected wallet
 * Uses the smart contract's viewMyNFTs() function
 */
export function useMyNFTs() {
  const { address, isConnected } = useAccount();
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  // Read my NFTs from smart contract
  const { 
    data: myNFTs, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'viewMyNFTs',
    account: address,
  });

  const nftList = (myNFTs as NFT[]) || [];

  // Fetch image URLs from Pinata for all NFTs
  useEffect(() => {
    const fetchImages = async () => {
      const newImageUrls: Record<string, string> = {};
      
      for (const nft of nftList) {
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
    
    if (nftList.length > 0) {
      fetchImages();
    }
  }, [myNFTs]);

  /**
   * Get the displayable image URL for an NFT
   */
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

  return {
    myNFTs: nftList,
    isLoading,
    isError,
    error,
    isConnected,
    refetch,
    getImageUrl,
    imageUrls,
  };
}

/**
 * Hook to fetch all NFTs from the marketplace
 */
export function useAllNFTs() {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const { 
    data: allNFTs, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'viewAllNFTs',
  });

  const nftList = (allNFTs as NFT[]) || [];

  // Fetch image URLs from Pinata for all NFTs
  useEffect(() => {
    const fetchImages = async () => {
      const newImageUrls: Record<string, string> = {};
      
      for (const nft of nftList) {
        const imageHash = nft.imageHash;
        
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
          newImageUrls[nft.id.toString()] = imageHash;
        }
      }
      
      setImageUrls(prev => ({ ...prev, ...newImageUrls }));
    };
    
    if (nftList.length > 0) {
      fetchImages();
    }
  }, [allNFTs]);

  const getImageUrl = (nft: NFT): string => {
    const signedUrl = imageUrls[nft.id.toString()];
    if (signedUrl) return signedUrl;
    
    if (nft.imageHash.startsWith('ipfs://')) {
      return nft.imageHash.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    
    return nft.imageHash;
  };

  return {
    allNFTs: nftList,
    isLoading,
    isError,
    error,
    refetch,
    getImageUrl,
    imageUrls,
  };
}

/**
 * Hook to fetch NFTs listed for sale
 */
export function useNFTsForSale() {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const { 
    data: forSaleNFTs, 
    isLoading, 
    isError,
    error,
    refetch 
  } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'viewNFTsForSale',
  });

  const nftList = (forSaleNFTs as NFT[]) || [];

  // Fetch image URLs from Pinata for all NFTs
  useEffect(() => {
    const fetchImages = async () => {
      const newImageUrls: Record<string, string> = {};
      
      for (const nft of nftList) {
        const imageHash = nft.imageHash;
        
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
          newImageUrls[nft.id.toString()] = imageHash;
        }
      }
      
      setImageUrls(prev => ({ ...prev, ...newImageUrls }));
    };
    
    if (nftList.length > 0) {
      fetchImages();
    }
  }, [forSaleNFTs]);

  const getImageUrl = (nft: NFT): string => {
    const signedUrl = imageUrls[nft.id.toString()];
    if (signedUrl) return signedUrl;
    
    if (nft.imageHash.startsWith('ipfs://')) {
      return nft.imageHash.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }
    
    return nft.imageHash;
  };

  return {
    forSaleNFTs: nftList,
    isLoading,
    isError,
    error,
    refetch,
    getImageUrl,
    imageUrls,
  };
}
