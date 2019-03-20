import React from 'react';
import { HeaderText, Layout, Products } from '../components';

const ClothingPage: React.FunctionComponent = () => {
  return (
    <Layout pageTitle="Clothing">
      <HeaderText>Clothing</HeaderText>
      <Products handle="clothing" />
    </Layout>
  );
};

export default ClothingPage;
