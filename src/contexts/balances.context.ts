import React from 'react';
import { BigNumber } from 'ethers';

export const BalancesContext = React.createContext<{ [key: string]: BigNumber }>({});
