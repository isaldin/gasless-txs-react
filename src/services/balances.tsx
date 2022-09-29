import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { BalancesContext } from '../contexts/balances.context';
import { getBalance } from '../utils/blockchain/eth-balance';
import { Chain, CHAINS_TOKENS, EthereumToken } from '../utils/conts';
import { getBalanceForToken } from '../utils/blockchain/erc20-balance';
import { BALANCES_UPDATE_INTERVAL_MS } from '../utils/config';

type Props = React.PropsWithChildren & {};

export const BalancesService: React.FC<Props> = (props) => {
  const { chainId, account, active } = useWeb3React();
  const [balances, setBalances] = useState<{ [key: string]: BigNumber }>({});

  const fetchAndUpdateBalances = () => {
    if (!chainId || !account || !active) {
      return;
    }

    Promise.all([
      ...CHAINS_TOKENS[chainId as Chain].map((token) => {
        if (token.address === EthereumToken.address) {
          return getBalance(account).then(
            (balance) => [token.address, balance] as [string, BigNumber],
          );
        }
        return getBalanceForToken(account, token).then(
          (balance) => [token.address, balance] as [string, BigNumber],
        );
      }),
    ]).then((balancesPairs: Array<[string, BigNumber]>) => {
      const balancesObj = balancesPairs.reduce((acc, item) => {
        acc[item[0]] = item[1];
        return acc;
      }, {} as { [key: string]: BigNumber });

      setBalances(balancesObj);
    });
  };

  useEffect(() => {
    fetchAndUpdateBalances();

    const interval = setInterval(() => {
      fetchAndUpdateBalances();
    }, BALANCES_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [chainId, account, active]);

  return <BalancesContext.Provider value={balances}>{props.children}</BalancesContext.Provider>;
};
