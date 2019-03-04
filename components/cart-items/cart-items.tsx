import React from 'react';
import { CartItem, CartSection, Heading } from '..';
import { CheckoutLineItemEdge } from '../../interfaces';
import styles from './cart-items.scss';

interface Props {
  products: CheckoutLineItemEdge[];
}

const CartItems: React.FunctionComponent<Props> = ({ products }) => {
  return (
    <CartSection>
      <Heading type="h3">Products</Heading>
      <ul className={styles.items}>
        {products.map(product => {
          const { id } = product.node;
          return <CartItem key={id} data={product} />;
        })}
      </ul>
    </CartSection>
  );
};

export default CartItems;
