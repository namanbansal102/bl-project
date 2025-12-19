# 🚀 My NFTs Feature - Quick Reference

## 📍 Files Created

```
frontend/
├── lib/
│   ├── nft-hooks.ts          ⭐ Custom React hooks
│   └── nft-utils.ts           🛠️  Utility functions
├── components/
│   └── MyNFTsList.tsx         🎨 NFT display component
├── app/
│   └── mynfts/
│       └── page.tsx           📄 My NFTs page
├── examples/
│   └── nft-utils-examples.tsx 📚 Usage examples
└── docs/
    ├── MY_NFTS_DOCUMENTATION.md  📖 Full docs
    └── MYNFTS_SUMMARY.md          📋 Quick summary
```

---

## ⚡ Quick Start Commands

### 1. View My NFTs Page
```bash
# Navigate to:
http://localhost:3000/mynfts
```

### 2. Use in Any Component
```tsx
import MyNFTsList from '@/components/MyNFTsList';

export default function Page() {
  return <MyNFTsList />;
}
```

### 3. Use Hook for Custom Logic
```tsx
import { useMyNFTs } from '@/lib/nft-hooks';

const { myNFTs, isLoading, getImageUrl } = useMyNFTs();
```

---

## 🎯 Key Hooks

### `useMyNFTs()`
Fetches NFTs owned by connected wallet

**Returns:**
- `myNFTs` - Array of NFT objects
- `isLoading` - Loading state
- `getImageUrl(nft)` - Get image URL
- `refetch()` - Refresh data

### `useAllNFTs()`
Fetches all marketplace NFTs

### `useNFTsForSale()`
Fetches NFTs listed for sale

---

## 🛠️ Key Utility Functions

```tsx
import { 
  formatNFTPrice,      // Format price: "0.1500 ETH"
  shortenAddress,      // Format address: "0x1234...5678"
  getNFTStats,         // Get collection stats
  sortNFTs,            // Sort by price/date
  filterNFTsByStatus,  // Filter listed/unlisted
  searchNFTs,          // Search by name/description
} from '@/lib/nft-utils';
```

### Common Use Cases

```tsx
// Format price
formatNFTPrice(nft.price, 4) // "0.1234 ETH"

// Shorten address
shortenAddress(nft.owner) // "0x1234...5678"

// Get stats
const stats = getNFTStats(myNFTs);
console.log(stats.totalValue); // Total collection value

// Sort NFTs
const sorted = sortNFTs(myNFTs, 'price-desc');

// Filter NFTs
const listed = filterNFTsByStatus(myNFTs, 'listed');

// Search NFTs
const results = searchNFTs(myNFTs, 'cool art');
```

---

## 📊 Smart Contract Integration

### Contract Function Used
```solidity
function viewMyNFTs() public view returns (NFT[] memory)
```

### How It's Called
```tsx
const { data: myNFTs } = useReadContract({
  address: NFT_CONTRACT_ADDRESS,
  abi: NFT_CONTRACT_ABI,
  functionName: 'viewMyNFTs',
  account: address,
});
```

---

## 🎨 Component Features

### MyNFTsList Component

**Features:**
- ✅ Displays NFT grid with images
- ✅ List/Unlist for sale functionality
- ✅ Detail modal on click
- ✅ Price setting modal
- ✅ Auto-refresh after transactions
- ✅ Loading & error states
- ✅ Responsive design
- ✅ Hover animations

**Props:**
```tsx
<MyNFTsList 
  onRefresh={() => console.log('refreshed')} // Optional
/>
```

---

## 🔧 Customization Examples

### Change Card Layout
```tsx
// In MyNFTsList.tsx, find:
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"

// Change to 3 columns:
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
```

### Add Custom Filter
```tsx
const { myNFTs } = useMyNFTs();
const highValueNFTs = myNFTs.filter(nft => nft.price > parseEther('0.5'));
```

### Add Search Bar
```tsx
import { searchNFTs } from '@/lib/nft-utils';
const [search, setSearch] = useState('');
const filtered = searchNFTs(myNFTs, search);
```

---

## 📈 Statistics Dashboard

```tsx
import { getNFTStats, formatNFTPrice } from '@/lib/nft-utils';

const stats = getNFTStats(myNFTs);

<div>
  <p>Total NFTs: {stats.totalNFTs}</p>
  <p>Listed: {stats.listedNFTs}</p>
  <p>Total Value: {formatNFTPrice(stats.totalValue)} ETH</p>
  <p>Average: {formatNFTPrice(stats.averagePrice)} ETH</p>
  <p>Highest: {formatNFTPrice(stats.highestPrice)} ETH</p>
</div>
```

---

## 🐛 Troubleshooting

### Images not loading?
```tsx
// Check Pinata config in lib/pinata.ts
NEXT_PUBLIC_PINATA_KEY=your_jwt_token
```

### No NFTs showing?
1. Connect wallet
2. Check contract address in `lib/contract.ts`
3. Verify you own NFTs on-chain
4. Open browser console for errors

### Transaction failing?
- Check wallet has ETH for gas
- Verify contract address
- Check if NFT is already listed/unlisted

---

## 🎯 Integration Points

### Existing NFTList Page
Already has filter for "Owned" NFTs

### New MyNFTs Page
Dedicated page at `/mynfts`

### Navbar
Added "My NFTs" link

### Reusable Hook
Use `useMyNFTs()` anywhere

---

## 📞 Common Patterns

### Pattern 1: Stats Widget
```tsx
function StatsWidget() {
  const { myNFTs } = useMyNFTs();
  const stats = getNFTStats(myNFTs);
  return <div>{stats.totalNFTs} NFTs</div>;
}
```

### Pattern 2: NFT Grid
```tsx
function NFTGrid() {
  const { myNFTs, getImageUrl } = useMyNFTs();
  return (
    <div className="grid grid-cols-3 gap-4">
      {myNFTs.map(nft => (
        <img key={nft.id} src={getImageUrl(nft)} />
      ))}
    </div>
  );
}
```

### Pattern 3: Price Display
```tsx
import { formatNFTPrice } from '@/lib/nft-utils';
<p>{formatNFTPrice(nft.price)} ETH</p>
```

---

## ✅ Checklist

- [x] Custom hooks created
- [x] MyNFTsList component created
- [x] Utility functions created
- [x] Example page created
- [x] Navbar updated
- [x] Documentation written
- [x] Examples provided

---

## 🚀 Next Steps

1. **Test**: Visit `/mynfts`
2. **Connect**: Connect your wallet
3. **View**: See your NFT collection
4. **List**: Try listing an NFT for sale
5. **Customize**: Modify styles as needed

---

## 📚 Full Documentation

For complete API reference and examples:
- **Full Docs**: `MY_NFTS_DOCUMENTATION.md`
- **Summary**: `MYNFTS_SUMMARY.md`
- **Examples**: `examples/nft-utils-examples.tsx`

---

**Ready to use! Visit `/mynfts` to see your NFT collection.** 🎨
