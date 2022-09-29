import React, { PropsWithChildren } from 'react';
import { Header } from '../../components/header/Header';

import './MainLayout.scss';

type MainLayoutProps = PropsWithChildren & {};

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className="main-layout-container">
      <Header></Header>
      {props.children}
    </div>
  );
};
