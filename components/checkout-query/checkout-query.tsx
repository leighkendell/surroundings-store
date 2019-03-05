import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { getCheckout } from '../../graphql/checkout';

interface Props {
  children: (data) => QueryResult;
}

const CheckoutQuery: React.FunctionComponent<Props> = ({ children }) => {
  if (localStorage.getItem('shopify-checkout-id')) {
  }

  return (
    <Query query={getCheckout} variables={{}}>
      {({ loading, data, error }) => {
        if (loading) {
          return null;
        }

        if (error) {
          return null;
        }

        if (data) {
          return children(data);
        }
      }}
    </Query>
  );
};

export default CheckoutQuery;
