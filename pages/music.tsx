import React from 'react';
import { HeaderText, Layout, Products } from '../components';

const MusicPage: React.FunctionComponent = () => {
  return (
    <Layout pageTitle="Music">
      <HeaderText>Music</HeaderText>
      <Products handle="music" />
    </Layout>
  );
};

export default MusicPage;
