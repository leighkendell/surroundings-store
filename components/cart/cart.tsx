import React from 'react';
import { Query } from 'react-apollo';
import { getCheckout } from '../../graphql/checkout';

const Cart: React.FunctionComponent = () => (
  <Query query={getCheckout}>
    {({ data }) => {
      return null;
    }}
  </Query>
);

export default Cart;
