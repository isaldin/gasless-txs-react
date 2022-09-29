import React, { useContext, useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/main/MainLayout';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import './MainPage.scss';
import { BalancesContext } from '../../contexts/balances.context';
import { Chain, CHAINS_TOKENS, DAIForChain, MAX_INT_STRING } from '../../utils/conts';
import { Balances } from './components/balances/Balances';
import { DistributeForm } from './components/distibute-form/DistributeForm';
import { Biconomy } from '@biconomy/mexa';
import { getSharedWeb3 } from '../../utils/shared-web3';
import { ExternalProvider } from '@ethersproject/providers';
import { BICONOMY_API_KEY } from '../../utils/config';
import { contractAddressesMap } from '../../utils/blockchain/contract-addresses.const';
import { Nullable, TxHash } from '../../types/common';
import { getContract, getContractWithName } from '../../utils/blockchain/call-contract';
import { TransactionReceipt } from 'web3-core';
import { DEFAULT_BUTTON_STATE, fromApproveTxStateToButtonState } from './MainPage.utils';
import { DistItemType } from './components/distibute-form/components/DistributeItem';

type Props = {};

export const MainPage: React.FC<Props> = () => {
  const { active, account, chainId, library } = useWeb3React<Web3>();
  const balances = useContext(BalancesContext);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [buttonState, setButtonState] = useState<{ disabled: boolean; title: string }>({
    disabled: false,
    title: 'Approve DAI for distribution',
  });
  const [approveTxState, setApproveTxState] = useState<{
    txHash?: TxHash;
    status: 'unknown' | 'pending' | 'confirmed' | 'error';
  }>({ status: 'unknown' });
  const [biconomy, setBiconomy] = useState<Biconomy>();
  const [lastTxHash, setLastTxHash] = useState<Nullable<{ title: string; hash: TxHash }>>(null);

  const daiToken = DAIForChain[chainId as Chain];

  useEffect(() => {
    setLoggedIn(Boolean(active && account && chainId));
  }, [active, account, chainId]);

  useEffect(() => {
    setButtonState(fromApproveTxStateToButtonState(approveTxState));
  }, [approveTxState]);

  useEffect(() => {
    if (!library) {
      return;
    }

    const initBiconomy = async () => {
      const _biconomy = new Biconomy(getSharedWeb3().currentProvider as ExternalProvider, {
        apiKey: BICONOMY_API_KEY,
        debug: true,
        contractAddresses: [contractAddressesMap.biconomy_disperse],
      });
      await _biconomy.init();
      setBiconomy(_biconomy);
    };
    if (account && chainId && getSharedWeb3()) initBiconomy();
  }, [account, chainId, library]);

  const handleClickDistributeTokens = async (items: DistItemType[]) => {
    setApproveTxState({ status: 'pending' });

    const approveTx: TransactionReceipt = await getContract('minERC20', daiToken.address)
      .methods.approve(contractAddressesMap.biconomy_disperse, MAX_INT_STRING)
      .send({
        from: account!,
      })
      .catch(console.error);
    if (!approveTx || !approveTx.status) {
      setApproveTxState({ status: 'error' });
      return;
    }
    setApproveTxState({
      status: 'confirmed',
      txHash: approveTx.transactionHash,
    });
    setLastTxHash({ title: 'Approve tx', hash: approveTx.transactionHash });

    const web3 = new Web3(biconomy!.provider as any);
    const contract = getContractWithName('biconomy_disperse', web3);

    contract.methods
      .disperseToken(
        daiToken.address,
        items.map((distItem) => distItem.address),
        items.map((distItem) => distItem.amount),
      )
      .send({
        from: account!,
        signatureType: 'EIP712_SIGN',
      });

    try {
      const metaTxHash = await new Promise((resolve, reject) => {
        biconomy!.on('txMined', (data: any) => {
          // Event emitter to monitor when a transaction is mined
          console.log('txMined', data);
          resolve(data.hash);
        });
        biconomy!.on('error', (data: any) => {
          // Event emitter to monitor when an error occurs
          console.log('transaction data', data);
          reject(data);
        });
        biconomy!.on('txHashGenerated', (data: any) => {
          // Event emitter to monitor when an error occurs
          console.log('txHashGenerated', data);
          setLastTxHash({ title: 'Start mining meta tx', hash: data.hash });
        });
      });
      setLastTxHash({ title: 'Meta tx mined', hash: metaTxHash as string });
      setButtonState(DEFAULT_BUTTON_STATE);
    } catch (error) {
      console.error('Meta tx error', error);
      setButtonState({ disabled: false, title: 'Error, pls try again' });
    }
  };

  return (
    <MainLayout>
      {isLoggedIn && CHAINS_TOKENS[chainId as Chain]?.length && (
        <>
          {biconomy && (
            <>
              <Balances balances={balances} tokens={CHAINS_TOKENS[chainId as Chain]} />
              <DistributeForm
                onDistributeClicked={handleClickDistributeTokens}
                buttonState={buttonState}></DistributeForm>
              {lastTxHash && (
                <a href={`https://goerli.etherscan.io/tx/${lastTxHash.hash}`} target="_blank">
                  {lastTxHash.title}
                </a>
              )}
            </>
          )}
          {!biconomy && <div>Loading...</div>}
        </>
      )}
    </MainLayout>
  );
};
