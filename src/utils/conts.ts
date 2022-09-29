import { Token } from '../types/common';

export enum Chain {
  Ethereum = 1,
  Rinkeby = 4,
  Goerli = 5,
}

export const CHAINS_LABELS: { [key in Chain]: string } = {
  [Chain.Ethereum]: 'Ethereum Mainnet',
  [Chain.Rinkeby]: 'Ethereum Rinkeby Testnet',
  [Chain.Goerli]: 'Ethereum Goerli Testnet',
};

export const EthereumToken = {
  address: '0x0000000000000000000000000000000000000000',
  symbol: 'ETH',
  decimals: 18,
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1024px-Ethereum-icon-purple.svg.png',
};

export const DAIForChain: { [key in Chain]: Token } = {
  [Chain.Ethereum]: {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
    decimals: 18,
    logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
  },
  [Chain.Rinkeby]: {
    address: '0xc3dbf84Abb494ce5199D5d4D815b10EC29529ff8',
    symbol: 'DAI',
    decimals: 18,
    logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
  },
  [Chain.Goerli]: {
    address: '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60',
    symbol: 'DAI',
    decimals: 18,
    logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
  },
};

export const CHAINS_TOKENS: { [key in Chain]: Token[] } = {
  [Chain.Ethereum]: [EthereumToken, DAIForChain[Chain.Ethereum]],
  [Chain.Rinkeby]: [EthereumToken, DAIForChain[Chain.Rinkeby]],
  [Chain.Goerli]: [EthereumToken, DAIForChain[Chain.Goerli]],
};

export const MAX_INT_STRING = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
