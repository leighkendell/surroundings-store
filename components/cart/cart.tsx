import React from 'react';
import { Query } from 'react-apollo';
import {
  CartFooter,
  CartItems,
  CartSection,
  CartWrapper,
  CheckoutQuery,
  Heading,
  Text,
} from '..';
import { getCart } from '../../graphql/cart';
import { Cart as CartInterface } from '../../interfaces';
import { formatCurrency } from '../../lib/helpers';

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

const Cart: React.FunctionComponent = () => (
  <CheckoutQuery>
    {({ webUrl, totalPrice, lineItems }) => {
      const isCartEmpty = lineItems.edges.length === 0;
      const formattedPrice = formatCurrency('AUD', parseFloat(totalPrice));

      return (
        <Query<CartInterface> query={getCart}>
          {({ data, client }) => {
            if (data) {
              return (
                <CartWrapper cart={data.cart}>
                  <Heading type="h2">Your cart</Heading>
                  {isCartEmpty ? (
                    <EmptyMessage />
                  ) : (
                    <>
                      <CartItems products={lineItems.edges} client={client} />
                      <CartFooter webUrl={webUrl} totalPrice={formattedPrice} />
                    </>
                  )}
                </CartWrapper>
              );
            }
            return null;
          }}
        </Query>
      );
    }}
  </CheckoutQuery>
);
export default Cart;
