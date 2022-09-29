import { BigNumber } from 'ethers';
import BN from 'bn.js';
import { getSharedWeb3 } from './shared-web3';

export const weis2gweis = (weis: BigNumber): string => {
  return getSharedWeb3().utils.fromWei(new BN(weis.toString()), 'gwei');
};

export const weisToEther = (weis: BigNumber): string => {
  return getSharedWeb3().utils.fromWei(weis.toString(), 'ether');
};
