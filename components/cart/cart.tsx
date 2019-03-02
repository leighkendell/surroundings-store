import React from 'react';
import { Query } from 'react-apollo';
import { CartWrapper, Heading } from '..';
import { getCheckout } from '../../graphql/checkout';

interface Props {
  isReady: boolean;
}

const Cart: React.FunctionComponent<Props> = ({ isReady }) => (
  <Query query={getCheckout} variables={{ isReady }}>
    {({ data }) => {
      if (data) {
        const { cart } = data;

        return (
          <CartWrapper cart={cart}>
            <Heading type="h2">Your cart</Heading>
          </CartWrapper>
        );
      }
    }}
  </Query>
);
export default Cart;
