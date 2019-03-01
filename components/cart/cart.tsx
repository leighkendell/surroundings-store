import React from 'react';
import { Query } from 'react-apollo';
import { getCheckout } from '../../graphql/checkout';

interface Props {
  isReady: boolean;
}

const Cart: React.FunctionComponent<Props> = ({ isReady }) => (
  <>
    {isReady && (
      <Query query={getCheckout}>
        {({ data, error, loading }) => {
          console.log(data, error, loading);
          return null;
        }}
      </Query>
    )}
  </>
);

export default Cart;
