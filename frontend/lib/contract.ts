import { Address } from 'viem';
import contractABI from './abi.json';

// Replace this with your deployed contract address
export const NFT_CONTRACT_ADDRESS: Address = '0xF49845410DA13B0dd3FD56Fa483F7E5fbe8D184c'; // TODO: Update  after deployment

export const NFT_CONTRACT_ABI = contractABI;

export interface NFT {
  id: bigint;
  name: string;
  description: string;
  imageHash: string;
  price: bigint;
  royalties: bigint;
  creator: Address;
  currentOwner: Address;
  isForSale: boolean;
  timesSold: bigint;
}
