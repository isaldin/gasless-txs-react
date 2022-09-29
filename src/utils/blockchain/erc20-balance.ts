import { Token, WalletAddress } from '../../types/common';
import { BigNumber } from 'ethers';
import { callContract } from './call-contract';

export const getBalanceForToken = (address: WalletAddress, token: Token): Promise<BigNumber> => {
  return callContract('minERC20', token.address, 'balanceOf', address).then((val) =>
    BigNumber.from(val),
  );
};
