import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, CartSection, Heading, Text } from '..';
import { updateCartOpen } from '../../graphql/cart';

interface Props {
  totalPrice: string;
  webUrl: string;
}

const CartFooter: React.FunctionComponent<Props> = ({ totalPrice, webUrl }) => {
  const navigateToCart = () => {
    window.location.href = webUrl;
  };

  return (
    <>
      <CartSection>
        <Heading type="h3">Subtotal: {totalPrice}</Heading>
        <Text>Final total + shipping will be calculated at checkout.</Text>
      </CartSection>
      <CartSection inline={true}>
        <Button onClick={navigateToCart}>Checkout</Button>
        <Mutation<any> mutation={updateCartOpen}>
          {updateCartOpenMutation => (
            <Button
              basic={true}
              onClick={() =>
                updateCartOpenMutation({ variables: { isOpen: false } })
              }
            >
              Continue shopping
            </Button>
          )}
        </Mutation>
      </CartSection>
    </>
  );
};

export default CartFooter;
