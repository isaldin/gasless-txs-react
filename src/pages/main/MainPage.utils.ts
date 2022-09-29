import { TxHash } from '../../types/common';

type ApproveTxState = {
  txHash?: TxHash;
  status: 'unknown' | 'pending' | 'confirmed' | 'error';
};

type ButtonState = { disabled: boolean; title: string };

export const DEFAULT_BUTTON_STATE: ButtonState = {
  disabled: false,
  title: 'Approve DAI for distribution',
};

export const fromApproveTxStateToButtonState = (approveTxState: ApproveTxState): ButtonState => {
  if (approveTxState.status === 'pending') {
    return { disabled: true, title: 'Approving' };
  } else if (approveTxState.status === 'confirmed') {
    return { disabled: true, title: 'Sending meta transaction' };
  }

  return DEFAULT_BUTTON_STATE;
};
