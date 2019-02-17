import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import { HeaderText, Layout } from '../components';
import getProduct from '../graphql/get-product';

interface Props {
  router: SingletonRouter;
}

const ProductPage: React.FunctionComponent<Props> = ({ router }) => {
  const { handle, title: initialTitle } = router.query;

  return (
    <Layout>
      <Query query={getProduct} variables={{ handle }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <HeaderText>{initialTitle}</HeaderText>;
          }

          if (error) {
            return null;
          }

          if (data) {
            const { title } = data.productByHandle;

            return <HeaderText>{title}</HeaderText>;
          }
        }}
      </Query>
    </Layout>
  );
};

export default withRouter(ProductPage);
