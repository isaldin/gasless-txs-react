import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import './App.scss';
import { MainPage } from './pages/main/MainPage';
import { getSharedWeb3, setSharedWeb3 } from './utils/shared-web3';
import { BalancesService } from './services/balances';

const getLibrary = (provider: any) => {
  setSharedWeb3(new Web3(provider));
  return getSharedWeb3();
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BalancesService>
        <MainPage></MainPage>
      </BalancesService>
    </Web3ReactProvider>
  );
};

export default App;
