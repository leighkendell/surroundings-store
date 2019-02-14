import Head from 'next/head';
import React from 'react';
import { Footer, Nav } from '..';
import './layout.scss';

const Layout: React.FunctionComponent = ({ children }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.typekit.net/nfn4mpw.css" />
      <title>Surroundings - Store</title>
    </Head>
    <Nav />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
