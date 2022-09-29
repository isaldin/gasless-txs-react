import { AccountAddress, WalletAddress } from '../../types/common';

export const isValidAddress = (address: WalletAddress | AccountAddress): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
