import Head from 'next/head';
import React from 'react';
import './layout.scss';

const Layout: React.FunctionComponent = ({ children }) => (
  <>
    <Head>
      <title>Surroundings - Store</title>
    </Head>
    <main>{children}</main>
  </>
);

export default Layout;
