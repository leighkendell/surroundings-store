import React from 'react';
import { Query } from 'react-apollo';
import { CartWrapper, Heading, Text } from '..';
import { getCheckout } from '../../graphql/checkout';
import CartItem from '../cart-item/cart-item';

interface Props {
  isReady: boolean;
}

const EmptyMessage: React.FunctionComponent = () => (
  <Text>
    Your cart is empty{' '}
    <span role="img" aria-label="Sad face">
      😔
    </span>
    , add some merch!
  </Text>
);

const Cart: React.FunctionComponent<Props> = ({ isReady }) => (
  <Query query={getCheckout} variables={{ isReady }}>
    {({ data }) => {
      if (data) {
        const { cart, node: checkout } = data;
        const isCartEmpty = checkout && checkout.lineItems.edges.length === 0;

        return (
          <CartWrapper cart={cart}>
            <Heading type="h2">Your cart</Heading>
            {isCartEmpty && <EmptyMessage />}
          </CartWrapper>
        );
      }
    }}
  </Query>
);
export default Cart;
