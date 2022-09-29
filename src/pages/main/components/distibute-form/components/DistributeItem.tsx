import React, { useEffect, useState } from 'react';
import { Maybe, WalletAddress } from '../../../../../types/common';
import './DistributeItem.scss';

export type DistItemType = { address: WalletAddress; amount: string };

type Props = {
  value: DistItemType;
  onChange: (value: DistItemType) => void;
  onDelete: (address: WalletAddress) => void;
  index: number;
  errors: Maybe<any>;
};

export const DistributeItem: React.FC<Props> = ({ value, onDelete, onChange, index, errors }) => {
  const [componentValue, setComponentValue] = useState<DistItemType>({
    address: value.address,
    amount: value.amount,
  });

  useEffect(() => {
    onChange(componentValue);
  }, [componentValue]);

  return (
    <div className="distribute-item">
      <div className="fields">
        <label>Address:</label>
        <input
          type="text"
          name={`amounts.${index}.address`}
          value={componentValue.address}
          onChange={(e) => {
            setComponentValue((prevState) => ({
              ...prevState,
              address: e.target.value,
            }));
          }}
        />
        {errors?.address && <span className="error">{errors.address.message}</span>}
        <label>Amount (in weis):</label>
        <input
          type="text"
          name={`amounts.${index}.amount`}
          value={componentValue.amount}
          onChange={(e) => {
            setComponentValue((prevState) => ({
              ...prevState,
              amount: e.target.value,
            }));
          }}
        />
        {errors?.amount && <span className="error">{errors.amount.message}</span>}
      </div>
      <button onClick={() => onDelete(value.address)}>Delete item</button>
    </div>
  );
};
