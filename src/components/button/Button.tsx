import React from 'react';

import './Button.scss';

type Props = React.HTMLProps<HTMLButtonElement> &
  React.PropsWithChildren & {
    disabled?: boolean;
    onClick: () => void;
  };

export const Button: React.FC<Props> = (props) => (
  <div
    className={`button-container ${props.disabled ? 'disabled' : ''}`}
    onClick={props.disabled ? () => {} : props.onClick}>
    {props.children}
  </div>
);
