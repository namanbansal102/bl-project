# NFT Marketplace Integration Guide

## Overview
Your NFT marketplace has been successfully integrated with the smart contract functions for creating and viewing NFTs. The integration is complete and ready to use once you deploy your smart contract.

## ✅ Completed Integration

### 1. **Create NFT Page** (`/createnft`)
- ✅ Form validation for all required fields
- ✅ Image upload with preview
- ✅ Integration with `createNFT` smart contract function
- ✅ Wallet connection requirement check
- ✅ Transaction status tracking (pending, confirming, success)
- ✅ Error handling with user-friendly messages
- ✅ Success notifications with transaction hash link
- ✅ Automatic form reset after successful minting
- ✅ Price input in ETH (automatically converts to Wei)
- ✅ Royalties input (0-100%)
- ✅ Dummy image hash placeholder (ready for Pinata integration)

### 2. **NFT List Page** (`/nftlist`)
- ✅ View all NFTs from contract
- ✅ Filter by: All NFTs, Owned NFTs, Listed for Sale
- ✅ Real-time data from smart contract
- ✅ Buy NFT functionality (with price validation)
- ✅ List NFT for sale (for owned NFTs)
- ✅ Unlist NFT from sale
- ✅ Detailed NFT view modal with all metadata
- ✅ Owner verification and permissions
- ✅ Transaction status indicators
- ✅ Responsive grid layout

### 3. **Smart Contract Functions Integrated**
- ✅ `createNFT` - Create new NFT with payment
- ✅ `viewAllNFTs` - View all minted NFTs
- ✅ `viewMyNFTs` - View NFTs owned by connected wallet
- ✅ `viewNFTsForSale` - View only NFTs listed for sale
- ✅ `buyNFT` - Purchase NFT with ETH
- ✅ `listNFTForSale` - List owned NFT for resale
- ✅ `unlistNFT` - Remove NFT from sale

## 📋 Setup Instructions

### Step 1: Deploy Your Smart Contract
1. Deploy the `NFTManagementSystem` contract to Sonic Testnet
2. Save the deployed contract address

### Step 2: Update Contract Address
Open `frontend/lib/contract.ts` and replace the placeholder address:

```typescript
export const NFT_CONTRACT_ADDRESS: Address = '0xYourDeployedContractAddress';
```

### Step 3: Install Dependencies (if not already done)
```bash
cd frontend
npm install
```

### Step 4: Run the Application
```bash
npm run dev
```

## 🎯 How to Use

### Creating an NFT
1. Navigate to `/createnft` page
2. Connect your wallet (MetaMask or WalletConnect)
3. Fill in the form:
   - **Title**: Name of your NFT
   - **Price**: Initial price in ETH (required for minting)
   - **Description**: Description of your NFT
   - **Royalties**: Creator royalty percentage (0-100%)
   - **Image**: Upload an image file
4. Click "Mint NFT"
5. Confirm the transaction in your wallet
6. Wait for confirmation
7. Success! Your NFT is now minted

### Viewing NFTs
1. Navigate to `/nftlist` page
2. Use filters to view:
   - **All NFTs**: See all minted NFTs
   - **Owned**: See only your NFTs
   - **Listed**: See NFTs available for purchase
3. Click on any NFT card to view details

### Buying an NFT
1. Find an NFT marked "Available for Sale"
2. Click "Buy Now" button
3. Confirm the transaction (paying the listed price)
4. NFT ownership transfers to you

### Listing Your NFT for Sale
1. Connect your wallet
2. Filter by "Owned" to see your NFTs
3. Click "List for Sale" on any owned NFT
4. Enter the sale price in ETH
5. Confirm the transaction
6. Your NFT is now listed for sale

### Unlisting an NFT
1. Find your listed NFT (shows "Unlist from Sale" button)
2. Click "Unlist from Sale"
3. Confirm the transaction

## 🔧 Configuration Files

### Contract Configuration (`lib/contract.ts`)
- Contract address (TODO: Update after deployment)
- ABI import
- TypeScript NFT interface

### Wagmi Configuration (`lib/wagmi.ts`)
- Sonic Testnet RPC configuration
- Wallet connectors (MetaMask, WalletConnect)
- Chain configuration

### ABI File (`lib/abi.json`)
- Complete contract ABI with all functions
- Event definitions
- Function signatures

## 📝 Important Notes

### Current Status
- ✅ Smart contract functions are integrated
- ⏳ Contract address needs to be updated after deployment
- ⏳ Pinata integration for image storage is pending (using dummy hash for now)

### Dummy Image Hash
Currently, the `createNFT` function uses a dummy image hash:
```typescript
const dummyImageHash = `ipfs://dummy-hash-${Date.now()}`;
```

**To integrate Pinata:**
1. Upload image to Pinata
2. Get the IPFS hash
3. Replace the dummy hash with the actual IPFS hash
4. The code in `lib/pinata.ts` is ready for this integration

### Transaction Flow
1. User submits form → Validation
2. If valid → Call `writeContract`
3. Transaction sent → `isPending` state
4. Mining transaction → `isConfirming` state
5. Transaction confirmed → `isConfirmed` state
6. Success notification → Refresh data

### Gas Fees
- Creating NFT requires payment of NFT price + gas
- Buying NFT requires payment of sale price + gas
- Listing/unlisting only requires gas fees

## 🔗 Important Links

- **Sonic Testnet Explorer**: https://explorer.testnet.soniclabs.com
- **Sonic Testnet RPC**: https://rpc.testnet.soniclabs.com
- **Get Testnet S tokens**: [Sonic Testnet Faucet]

## 🐛 Troubleshooting

### "Connect Wallet" issues
- Ensure MetaMask is installed
- Check that you're connected to Sonic Testnet
- Verify network configuration

### Transaction fails
- Check wallet has sufficient S tokens for gas
- Verify contract address is correct
- Ensure all form fields are properly filled

### NFTs not showing
- Contract might not be deployed
- Contract address not updated in `contract.ts`
- Check console for errors

## 🚀 Next Steps

1. **Deploy Contract**: Deploy to Sonic Testnet
2. **Update Address**: Add contract address to `contract.ts`
3. **Test**: Create and buy NFTs on testnet
4. **Pinata Integration**: Complete image storage integration
5. **Production**: Deploy to mainnet when ready

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify contract is deployed and address is correct
3. Ensure wallet is connected to Sonic Testnet
4. Check transaction history on block explorer

---

**Status**: ✅ Integration Complete - Ready for Contract Deployment
