# ✅ My NFTs Feature - Testing Checklist

## 🚀 Quick Test (5 minutes)

### Basic Functionality
- [ ] Navigate to `http://localhost:3000/mynfts`
- [ ] Page loads without errors
- [ ] See "Connect Your Wallet" message (if not connected)
- [ ] Click wallet button and connect
- [ ] NFTs load and display
- [ ] Images show correctly
- [ ] Click on an NFT card
- [ ] Detail modal opens
- [ ] Close modal works
- [ ] Click "List for Sale" button
- [ ] Price input modal opens
- [ ] Enter a price
- [ ] Click "List for Sale"
- [ ] Transaction confirms
- [ ] NFTs refresh automatically
- [ ] Button changes to "Unlist from Sale"

---

## 🧪 Detailed Testing

### 1. Navigation Testing
- [ ] Navbar shows "My NFTs" link
- [ ] Clicking "My NFTs" navigates to `/mynfts`
- [ ] URL changes to `/mynfts`
- [ ] Back button works correctly
- [ ] Page maintains state on navigation

### 2. Wallet Connection Testing
- [ ] **Not Connected State**
  - [ ] Shows "Connect Your Wallet" message
  - [ ] No NFTs displayed
  - [ ] Wallet button visible
  
- [ ] **Connecting Wallet**
  - [ ] Wallet modal opens
  - [ ] Can select wallet provider
  - [ ] Connection successful
  - [ ] Address shows in wallet button
  
- [ ] **Connected State**
  - [ ] NFTs load automatically
  - [ ] Loading spinner appears
  - [ ] NFTs render after loading
  - [ ] Wallet address visible

### 3. NFT Display Testing
- [ ] **Grid Layout**
  - [ ] Cards display in grid (4 columns on desktop)
  - [ ] Responsive on tablet (3 columns)
  - [ ] Responsive on mobile (1 column)
  - [ ] Cards have equal height
  - [ ] Spacing looks good
  
- [ ] **NFT Cards**
  - [ ] Image loads correctly
  - [ ] NFT name displays
  - [ ] Owner address shows (shortened)
  - [ ] Price displays in ETH
  - [ ] "Owned" badge visible
  - [ ] Hover effect works
  - [ ] Card scales on hover
  - [ ] Shadow appears on hover
  
- [ ] **Images**
  - [ ] IPFS images load via Pinata
  - [ ] HTTP images load directly
  - [ ] Fallback icon shows if no image
  - [ ] Images maintain aspect ratio
  - [ ] No broken image icons

### 4. Empty State Testing
- [ ] **No NFTs Owned**
  - [ ] Shows "No NFTs Found" message
  - [ ] Shows helpful text
  - [ ] No loading spinner
  - [ ] No error message
  
- [ ] **Wallet Not Connected**
  - [ ] Shows connect message
  - [ ] Wallet button visible
  - [ ] No error in console

### 5. Loading State Testing
- [ ] Loading spinner appears
- [ ] "Loading your NFTs..." text shows
- [ ] Spinner animates smoothly
- [ ] No flash of empty state
- [ ] Spinner disappears when loaded

### 6. Detail Modal Testing
- [ ] **Opening Modal**
  - [ ] Click any NFT card
  - [ ] Modal opens smoothly
  - [ ] Backdrop darkens screen
  - [ ] Modal centered on screen
  
- [ ] **Modal Content**
  - [ ] Large image displays
  - [ ] NFT name shows
  - [ ] NFT ID displays
  - [ ] Description shows
  - [ ] Creator address shows
  - [ ] Owner address shows
  - [ ] Royalties show
  - [ ] Times sold shows
  - [ ] Current price displays
  - [ ] "For Sale" badge (if listed)
  
- [ ] **Closing Modal**
  - [ ] X button closes modal
  - [ ] Click backdrop closes modal
  - [ ] ESC key closes modal (if implemented)
  - [ ] Modal closes smoothly

### 7. List NFT Testing
- [ ] **Opening List Modal**
  - [ ] Click "List for Sale" button
  - [ ] List modal opens
  - [ ] NFT name displays
  - [ ] Price input shows
  - [ ] Current price visible
  
- [ ] **Price Input**
  - [ ] Can type numbers
  - [ ] Accepts decimals
  - [ ] No negative numbers
  - [ ] Validation works
  
- [ ] **Listing NFT**
  - [ ] Enter valid price
  - [ ] Click "List for Sale"
  - [ ] Wallet opens for approval
  - [ ] Approve transaction
  - [ ] "Listing..." text shows
  - [ ] Button disabled during tx
  - [ ] Transaction confirms
  - [ ] Modal closes automatically
  - [ ] NFTs refresh
  - [ ] Button changes to "Unlist"
  - [ ] Success feedback (if any)
  
- [ ] **Error Handling**
  - [ ] Empty price shows error/disabled
  - [ ] Rejected transaction handled
  - [ ] Failed transaction shows error
  - [ ] Can retry after error

### 8. Unlist NFT Testing
- [ ] Click "Unlist from Sale" button
- [ ] Wallet opens for approval
- [ ] Approve transaction
- [ ] "Unlisting..." text shows
- [ ] Button disabled during tx
- [ ] Transaction confirms
- [ ] NFTs refresh
- [ ] Button changes to "List for Sale"

### 9. Hook Testing (useMyNFTs)
- [ ] Hook returns correct data structure
- [ ] `myNFTs` is an array
- [ ] `isLoading` is boolean
- [ ] `isConnected` reflects wallet state
- [ ] `getImageUrl()` returns valid URLs
- [ ] `refetch()` reloads data
- [ ] `imageUrls` map is populated

### 10. Utility Functions Testing
```tsx
// Test in browser console or create test file

// Test formatNFTPrice
formatNFTPrice(parseEther('0.1234')) // "0.1234"

// Test shortenAddress
shortenAddress('0x1234567890abcdef1234567890abcdef12345678') // "0x1234...5678"

// Test getNFTStats
getNFTStats(myNFTs) // Returns stats object

// Test sortNFTs
sortNFTs(myNFTs, 'price-desc') // Sorted array

// Test filterNFTsByStatus
filterNFTsByStatus(myNFTs, 'listed') // Only listed NFTs

// Test searchNFTs
searchNFTs(myNFTs, 'art') // NFTs with 'art' in name/description
```

### 11. Performance Testing
- [ ] Page loads in < 2 seconds
- [ ] Images load progressively
- [ ] No layout shift during loading
- [ ] Smooth animations (60fps)
- [ ] No janky scrolling
- [ ] Hover effects are smooth
- [ ] Modal animations smooth
- [ ] No memory leaks (check DevTools)

### 12. Error Handling Testing
- [ ] **Network Errors**
  - [ ] Disconnected wallet handled
  - [ ] Failed contract call handled
  - [ ] Pinata API error handled
  - [ ] Show error message
  
- [ ] **Invalid Data**
  - [ ] Missing image hash handled
  - [ ] Invalid NFT data handled
  - [ ] Null values handled
  
- [ ] **Transaction Errors**
  - [ ] Rejected transaction handled
  - [ ] Failed transaction handled
  - [ ] Insufficient gas handled
  - [ ] Error message shown

### 13. Mobile Responsiveness Testing
- [ ] **iPhone (375px)**
  - [ ] Layout adjusts to 1 column
  - [ ] Images scale correctly
  - [ ] Buttons are tappable
  - [ ] Modal fits screen
  - [ ] Text is readable
  
- [ ] **iPad (768px)**
  - [ ] Layout shows 2-3 columns
  - [ ] Touch interactions work
  - [ ] Modal centers correctly
  
- [ ] **Desktop (1920px)**
  - [ ] Layout shows 4 columns
  - [ ] Hover effects work
  - [ ] Modal doesn't look too large

### 14. Browser Compatibility Testing
- [ ] **Chrome/Edge**
  - [ ] All features work
  - [ ] No console errors
  - [ ] Wallet connects
  
- [ ] **Firefox**
  - [ ] All features work
  - [ ] No console errors
  - [ ] Wallet connects
  
- [ ] **Safari**
  - [ ] All features work
  - [ ] No console errors
  - [ ] Wallet connects

### 15. Accessibility Testing
- [ ] Images have alt text
- [ ] Buttons have labels
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast sufficient
- [ ] Screen reader compatible (bonus)

### 16. Integration Testing
- [ ] Works with existing `/nftlist` page
- [ ] Navbar link functions
- [ ] Can navigate between pages
- [ ] State persists correctly
- [ ] No conflicts with other components

---

## 🔍 Console Checks

### No Errors
```
✅ No console errors
✅ No console warnings
✅ No failed network requests
✅ No 404s
✅ No CORS errors
```

### Expected Logs
```
✓ "my cid is::" (from pinata.ts)
✓ "Pinata Signed URL:" (from pinata.ts)
✓ Contract read success
✓ Image fetch success
```

---

## 📊 Performance Metrics

### Target Metrics
- [ ] First Contentful Paint < 1s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3s
- [ ] Total Blocking Time < 300ms
- [ ] Cumulative Layout Shift < 0.1

### Check in DevTools
1. Open DevTools
2. Go to Lighthouse
3. Run audit
4. Check performance score (target: > 90)

---

## 🧪 Edge Cases

### Empty States
- [ ] No wallet connected
- [ ] Wallet connected but no NFTs
- [ ] Wallet connected with 1 NFT
- [ ] Wallet connected with 100+ NFTs

### Data Edge Cases
- [ ] NFT with no image
- [ ] NFT with very long name
- [ ] NFT with price of 0
- [ ] NFT with very high price
- [ ] NFT with special characters
- [ ] NFT with empty description

### Network Edge Cases
- [ ] Slow connection (throttle to 3G)
- [ ] Lost connection during load
- [ ] Lost connection during transaction
- [ ] Multiple wallets installed
- [ ] Wrong network selected

---

## ✅ Final Checklist

### Before Deployment
- [ ] All tests pass
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Images load correctly
- [ ] Transactions work
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Performance is good
- [ ] Accessibility OK

### Documentation
- [ ] README exists
- [ ] API documented
- [ ] Examples provided
- [ ] Comments in code
- [ ] Error handling documented

### Code Quality
- [ ] TypeScript types correct
- [ ] No unused variables
- [ ] No commented code
- [ ] Consistent formatting
- [ ] Proper error handling

---

## 🎯 Testing Scenarios

### Scenario 1: New User
1. Opens `/mynfts` for first time
2. Sees connect wallet message
3. Connects wallet
4. Sees NFTs load
5. Clicks an NFT
6. Views details
7. Lists NFT for sale
8. Transaction succeeds

### Scenario 2: Returning User
1. Opens `/mynfts` with wallet connected
2. NFTs load immediately
3. Sees updated data
4. Unlists a previously listed NFT
5. Transaction succeeds

### Scenario 3: User With No NFTs
1. Connects wallet
2. Sees "No NFTs Found" message
3. UI is not broken
4. Can navigate to other pages

### Scenario 4: Transaction Error
1. Tries to list NFT
2. Rejects transaction
3. Error handled gracefully
4. Can try again
5. Second attempt succeeds

---

## 📝 Test Results

### Test Date: ___________
### Tester: ___________

| Category | Status | Notes |
|----------|--------|-------|
| Navigation | ⬜ Pass / ⬜ Fail | |
| Wallet Connection | ⬜ Pass / ⬜ Fail | |
| NFT Display | ⬜ Pass / ⬜ Fail | |
| Images | ⬜ Pass / ⬜ Fail | |
| Modals | ⬜ Pass / ⬜ Fail | |
| Transactions | ⬜ Pass / ⬜ Fail | |
| Mobile | ⬜ Pass / ⬜ Fail | |
| Performance | ⬜ Pass / ⬜ Fail | |
| Errors | ⬜ Pass / ⬜ Fail | |

---

## 🐛 Issues Found

### Issue Template
```
Issue #1
- Description: 
- Steps to reproduce:
- Expected behavior:
- Actual behavior:
- Priority: High / Medium / Low
- Status: Open / Fixed
```

---

## ✅ Sign-off

- [ ] All critical tests pass
- [ ] All major tests pass
- [ ] Most minor tests pass
- [ ] Performance acceptable
- [ ] Ready for production

**Tested by:** ___________  
**Date:** ___________  
**Approved:** ⬜ Yes / ⬜ No

---

**Good luck with testing! 🚀**
