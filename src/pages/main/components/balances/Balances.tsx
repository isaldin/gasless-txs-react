import React from 'react';
import { BigNumber } from 'ethers';
import { AccountAddress, Token } from '../../../../types/common';
import { weisToEther } from '../../../../utils/units';

type Props = {
  balances: { [key: AccountAddress]: BigNumber };
  tokens: Token[];
};

export const Balances: React.FC<Props> = ({ balances, tokens }) => (
  <div className="balance-header">
    {tokens.map((token) => {
      return (
        balances[token.address] && (
          <div key={token.address} className="balance-item">
            {token.symbol}: {weisToEther(balances[token.address])}
          </div>
        )
      );
    })}
  </div>
);
