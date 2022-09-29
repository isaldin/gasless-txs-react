import { WalletAddress } from '../../types/common';
import { BigNumber } from 'ethers';
import { getSharedWeb3 } from '../shared-web3';

export const getBalance = (address: WalletAddress): Promise<BigNumber> => {
  return getSharedWeb3()
    .eth.getBalance(address)
    .then((weisStr) => BigNumber.from(weisStr));
};
