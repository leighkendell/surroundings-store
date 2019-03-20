import React from 'react';
import { HeaderText, Layout, Products } from '../components';

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout pageTitle="Home">
      <HeaderText>Store home</HeaderText>
      <Products handle="store-home" />
    </Layout>
  );
};

export default IndexPage;
