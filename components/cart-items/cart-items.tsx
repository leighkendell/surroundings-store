import React, { useState } from 'react';
import { CartItem, CartSection, Heading } from '..';
import { CheckoutLineItemEdge } from '../../interfaces';
import styles from './cart-items.scss';

interface Props {
  products: CheckoutLineItemEdge[];
}

const CartItems: React.FunctionComponent<Props> = ({ products }) => {
  const sortedProducts = products.sort((a, b) => {
    if (a.node.variant.id < b.node.variant.id) {
      return -1;
    }
    if (a.node.variant.id > b.node.variant.id) {
      return 1;
    }
    return 0;
  });

  return (
    <CartSection>
      <Heading type="h3">Products</Heading>
      <ul className={styles.items}>
        {sortedProducts.map(product => {
          const { id } = product.node;
          return <CartItem key={id} data={product} />;
        })}
      </ul>
    </CartSection>
  );
};

export default CartItems;
