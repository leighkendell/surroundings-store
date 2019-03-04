import React from 'react';
import { Query } from 'react-apollo';
import { CartFooter, CartItems, CartSection, CartWrapper, Heading, Text } from '..';
import { getCheckout } from '../../graphql/checkout';
import { formatCurrency } from '../../lib/helpers';

interface Props {
  isReady: boolean;
}

const EmptyMessage: React.FunctionComponent = () => (
  <CartSection>
    <Text>
      Your cart is empty{' '}
      <span role="img" aria-label="Sad face">
        😔
      </span>
      , add some merch!
    </Text>
  </CartSection>
);

const Cart: React.FunctionComponent<Props> = ({ isReady }) => (
  <Query query={getCheckout} variables={{ isReady }}>
    {({ data }) => {
      if (data) {
        const { cart, node: checkout } = data;
        const isCartEmpty = checkout && checkout.lineItems.edges.length === 0;
        const webUrl = checkout ? checkout.webUrl : '';
        const totalPrice = checkout ? formatCurrency('AUD', checkout.totalPrice) : '';
        const products = checkout ? checkout.lineItems.edges : [];

        return (
          <CartWrapper cart={cart}>
            <Heading type="h2">Your cart</Heading>
            {isCartEmpty ? (
              <EmptyMessage />
            ) : (
              <>
                <CartItems products={products} />
                <CartFooter webUrl={webUrl} totalPrice={totalPrice} />
              </>
            )}
          </CartWrapper>
        );
      }
    }}
  </Query>
);
export default Cart;
