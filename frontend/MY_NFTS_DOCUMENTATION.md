# My NFTs Feature Documentation

This documentation explains how to use the "My NFTs" feature that integrates with your smart contract's `viewMyNFTs()` function.

## 📦 What Was Created

### 1. **Custom Hooks** - `lib/nft-hooks.ts`
Reusable React hooks for fetching NFT data from the smart contract:

- `useMyNFTs()` - Fetches NFTs owned by the connected wallet (calls `viewMyNFTs()`)
- `useAllNFTs()` - Fetches all NFTs from the marketplace (calls `viewAllNFTs()`)
- `useNFTsForSale()` - Fetches NFTs listed for sale (calls `viewNFTsForSale()`)

### 2. **MyNFTsList Component** - `components/MyNFTsList.tsx`
A reusable component that displays NFTs owned by the connected user with images and interaction options.

### 3. **Example Page** - `app/mynfts/page.tsx`
A dedicated page showing how to use the MyNFTsList component.

---

## 🎯 Features

✅ **Calls Smart Contract's `viewMyNFTs()` function**  
✅ **Displays NFT Images from IPFS via Pinata**  
✅ **Shows all NFT metadata** (name, price, owner, creator, royalties, etc.)  
✅ **List/Unlist NFTs for sale** directly from the component  
✅ **Responsive grid layout** with hover effects  
✅ **Loading states** and error handling  
✅ **Wallet connection check**  
✅ **Auto-refresh** after transactions  

---

## 🚀 Quick Start

### Option 1: Use the Dedicated Page

Navigate to the `/mynfts` route:

\`\`\`tsx
// Visit http://localhost:3000/mynfts
// The page is already set up at app/mynfts/page.tsx
\`\`\`

### Option 2: Use the Component Anywhere

Import and use the `MyNFTsList` component in any page:

\`\`\`tsx
'use client';
import MyNFTsList from '@/components/MyNFTsList';

export default function YourPage() {
  return (
    <div>
      <h1>My NFT Collection</h1>
      <MyNFTsList />
    </div>
  );
}
\`\`\`

### Option 3: Use the Hook Directly

For custom implementations, use the `useMyNFTs()` hook:

\`\`\`tsx
'use client';
import { useMyNFTs } from '@/lib/nft-hooks';

export default function CustomComponent() {
  const { myNFTs, isLoading, isConnected, getImageUrl } = useMyNFTs();

  if (!isConnected) {
    return <p>Please connect your wallet</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {myNFTs.map((nft) => (
        <div key={nft.id.toString()}>
          <h3>{nft.name}</h3>
          <img src={getImageUrl(nft)} alt={nft.name} />
          <p>Price: {formatEther(nft.price)} ETH</p>
        </div>
      ))}
    </div>
  );
}
\`\`\`

---

## 📚 API Reference

### `useMyNFTs()` Hook

Returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| `myNFTs` | `NFT[]` | Array of NFTs owned by connected wallet |
| `isLoading` | `boolean` | Loading state |
| `isError` | `boolean` | Error state |
| `error` | `Error \| null` | Error object if any |
| `isConnected` | `boolean` | Wallet connection status |
| `refetch` | `() => void` | Function to manually refetch data |
| `getImageUrl` | `(nft: NFT) => string` | Get displayable image URL for an NFT |
| `imageUrls` | `Record<string, string>` | Map of NFT IDs to signed Pinata URLs |

### `MyNFTsList` Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRefresh` | `() => void` | `undefined` | Optional callback after data refresh |

---

## 🔧 How It Works

### 1. Smart Contract Integration

The hook calls your smart contract's `viewMyNFTs()` function:

\`\`\`solidity
// Your Smart Contract Function
function viewMyNFTs() public view returns (NFT[] memory) {
    uint256[] memory myNFTIds = ownerNFTs[msg.sender];
    NFT[] memory myNFTs = new NFT[](myNFTIds.length);
    
    for (uint256 i = 0; i < myNFTIds.length; i++) {
        myNFTs[i] = nfts[myNFTIds[i]];
    }
    
    return myNFTs;
}
\`\`\`

### 2. Image Handling

The component automatically:
- Extracts CID from `ipfs://` URLs
- Fetches signed URLs from Pinata for secure access
- Falls back to public IPFS gateway if needed
- Supports direct HTTP URLs

### 3. Transaction Flow

1. User clicks "List for Sale" or "Unlist"
2. Component calls smart contract function
3. Waits for transaction confirmation
4. Automatically refetches data
5. Updates UI

---

## 🎨 Customization

### Styling

The component uses Tailwind CSS with custom animations. Modify the classes in `MyNFTsList.tsx`:

\`\`\`tsx
// Example: Change card hover effect
className="hover:-translate-y-4 hover:scale-105"
// Change to:
className="hover:-translate-y-2 hover:scale-102"
\`\`\`

### Add Custom Actions

Extend the component with additional NFT actions:

\`\`\`tsx
const handleTransferNFT = async (nft: NFT, toAddress: string) => {
  writeContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: 'transferNFT',
    args: [nft.id, toAddress],
  });
};
\`\`\`

---

## 🔗 Integration with Existing NFTList Page

The existing `/nftlist` page already has this functionality built-in with filter options:
- **All NFTs** - Shows all marketplace NFTs
- **Owned** - Shows your NFTs (uses `viewMyNFTs()`)
- **Listed** - Shows NFTs for sale

The new components provide a **reusable** way to use this functionality anywhere in your app.

---

## 🐛 Troubleshooting

### Images Not Loading

1. Check Pinata JWT is set: `NEXT_PUBLIC_PINATA_KEY`
2. Verify gateway URL in `lib/pinata.ts`
3. Check browser console for CORS errors

### "No NFTs Found"

1. Ensure wallet is connected
2. Verify you own NFTs on-chain
3. Check contract address in `lib/contract.ts`
4. Try refreshing the page

### Transactions Failing

1. Check wallet has sufficient ETH for gas
2. Verify contract address is correct
3. Check if NFT is already listed/unlisted
4. Review transaction in block explorer

---

## 📝 Example Usage Scenarios

### Scenario 1: User Profile Page

\`\`\`tsx
// app/profile/page.tsx
import MyNFTsList from '@/components/MyNFTsList';

export default function ProfilePage() {
  return (
    <div>
      <h1>Your Profile</h1>
      <MyNFTsList />
    </div>
  );
}
\`\`\`

### Scenario 2: Dashboard Widget

\`\`\`tsx
import { useMyNFTs } from '@/lib/nft-hooks';

export default function Dashboard() {
  const { myNFTs } = useMyNFTs();
  
  return (
    <div className="stats">
      <p>Total NFTs Owned: {myNFTs.length}</p>
      <p>Total Value: {myNFTs.reduce((acc, nft) => acc + nft.price, 0n)}</p>
    </div>
  );
}
\`\`\`

### Scenario 3: NFT Gallery with Filters

\`\`\`tsx
import { useMyNFTs } from '@/lib/nft-hooks';
import { useState } from 'react';

export default function Gallery() {
  const { myNFTs, getImageUrl } = useMyNFTs();
  const [filter, setFilter] = useState<'all' | 'listed' | 'unlisted'>('all');
  
  const filteredNFTs = myNFTs.filter(nft => {
    if (filter === 'listed') return nft.isForSale;
    if (filter === 'unlisted') return !nft.isForSale;
    return true;
  });
  
  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="listed">Listed</option>
        <option value="unlisted">Unlisted</option>
      </select>
      
      <div className="grid">
        {filteredNFTs.map(nft => (
          <img key={nft.id} src={getImageUrl(nft)} alt={nft.name} />
        ))}
      </div>
    </div>
  );
}
\`\`\`

---

## 🎉 Summary

You now have:
1. ✅ A reusable hook (`useMyNFTs`) to fetch user's NFTs
2. ✅ A complete component (`MyNFTsList`) with UI and interactions
3. ✅ A dedicated page (`/mynfts`) ready to use
4. ✅ Full integration with your smart contract's `viewMyNFTs()` function
5. ✅ Automatic image loading from IPFS via Pinata

Visit `http://localhost:3000/mynfts` to see it in action! 🚀
