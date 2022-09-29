import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import { AccountAddress } from '../../types/common';
import { getSharedWeb3 } from '../shared-web3';
import minERC20 from './abis/minERC20.json';
import disperse from './abis/disperse.json';
import biconomy_disperse from './abis/biconomy_disperse.json';
import { contractAddressesMap } from './contract-addresses.const';
import Web3 from 'web3';

export type ContractName = 'minERC20' | 'disperse' | 'biconomy_disperse';

export const getContract = (
  contractName: ContractName,
  address: AccountAddress,
  web3 = getSharedWeb3(),
): Contract => {
  return new web3.eth.Contract(abiMap[contractName], address);
};

export const getContractWithName = (contractName: ContractName, web3?: Web3): Contract => {
  web3 = web3 || getSharedWeb3();
  return getContract(contractName, contractAddressesMap[contractName], web3);
};

export const callContract = <T>(
  contractName: ContractName,
  address: AccountAddress,
  method: string,
  params: unknown | unknown[],
): Promise<T> => {
  if (Array.isArray(params)) {
    return getContract(contractName, address)
      .methods[method](...params)
      .call();
  }

  return getContract(contractName, address).methods[method](params).call();
};

export const callContractWithName = <T>(
  contractName: ContractName,
  method: string,
  params: unknown,
) => {
  return callContract(contractName, contractAddressesMap[contractName]!, method, params);
};

export const abiMap: { [key in ContractName]: AbiItem | AbiItem[] } = {
  minERC20: minERC20 as AbiItem[],
  disperse: disperse as AbiItem[],
  biconomy_disperse: biconomy_disperse as AbiItem[],
};
