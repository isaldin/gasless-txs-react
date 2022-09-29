import Web3 from 'web3';

let sharedWeb3: Web3;

export const setSharedWeb3 = (web3: Web3) => {
  sharedWeb3 = web3;
};

export const getSharedWeb3 = (): Web3 => {
  return sharedWeb3;
};
