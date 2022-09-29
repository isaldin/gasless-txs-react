import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import './Header.scss';
import { Button } from '../button/Button';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { injectedConnector } from '../../utils/injected-connector';
import { Chain, CHAINS_LABELS } from '../../utils/conts';

import './Header.scss';

export const Header: React.FC = () => {
  const { active, activate, account, chainId, deactivate, setError } = useWeb3React<Web3>();

  useEffect(() => {
    console.log({ active, account, chainId });
  }, [active, account, chainId]);

  const onClickConnect = () => {
    activate(
      injectedConnector,
      (error) => {
        if (error instanceof UserRejectedRequestError) {
          // ignore user rejected error
          console.log('user refused');
        } else {
          setError(error);
        }
      },
      false,
    );
  };

  const onClickDisconnect = () => {
    deactivate();
  };

  return (
    <div className="container">
      <div className="left-part">
        {chainId && CHAINS_LABELS[chainId as Chain] && (
          <h3 className="title">{CHAINS_LABELS[chainId as Chain]}</h3>
        )}
      </div>
      <div className="right-part">
        {(!active || !account) && <Button onClick={onClickConnect}>Connect</Button>}
        {active && account && (
          <>
            <span className="address">{account}</span>
            <Button onClick={onClickDisconnect}>Disconnect</Button>
          </>
        )}
      </div>
    </div>
  );
};
