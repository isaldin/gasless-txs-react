import { TransactionReceipt } from 'web3-core';
import { ContractSendMethod } from 'web3-eth-contract';
import { WalletAddress } from '../../types/common';

export const sendTx = (
  contractSendMethod: ContractSendMethod,
  from: WalletAddress,
): Promise<TransactionReceipt> => {
  return new Promise((resolve, reject) => {
    contractSendMethod
      .send({ from })
      .once('error', (error) => {
        console.log('error', error);
        reject(error);
      })
      .once('confirmation', (number, receipt) => {
        console.log('confirmation', receipt);
        resolve(receipt);
      });
  });
};
