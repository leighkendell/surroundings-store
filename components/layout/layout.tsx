import Head from 'next/head';
import React from 'react';
import './layout.scss';

interface Props {
  pageTitle?: string;
}

const Layout: React.FunctionComponent<Props> = ({ children, pageTitle }) => (
  <>
    <Head>
      <title>{pageTitle} • Surroundings Store</title>
    </Head>
    {children}
  </>
);

Layout.defaultProps = {
  pageTitle: 'Store',
};

export default Layout;
