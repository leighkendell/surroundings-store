import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { CartItem, CartSection, Heading, Notification } from '..';
import { CheckoutLineItemEdge } from '../../interfaces';
import styles from './cart-items.scss';

interface Props {
  products: CheckoutLineItemEdge[];
}

const CartItems: React.FunctionComponent<Props> = React.memo(({ products }) => {
  // Refs
  const listEl = React.createRef<HTMLUListElement>();

  // State
  const [updating, setUpdating] = useState(false);
  const [listHeight, updateListHeight] = useState('0px');

  // Springs
  const heightSpring = useSpring({
    height: listHeight,
  });

  const updatingSpring = useSpring({
    opacity: updating ? 0.5 : 1,
    pointerEvents: updating ? 'none' : 'auto',
  });

  // Sort products by variant ID
  const sortedProducts = products.sort((a, b) => {
    if (a.node.variant.id < b.node.variant.id) {
      return -1;
    }
    if (a.node.variant.id > b.node.variant.id) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    const height = listEl.current ? listEl.current.offsetHeight : '';
    updateListHeight(`${height}px`);
  });

  return (
    <CartSection>
      <Heading type="h3">Products</Heading>
      <animated.div style={heightSpring}>
        <animated.ul className={styles.items} style={updatingSpring} ref={listEl}>
          {sortedProducts.map(product => {
            const { id } = product.node;
            return <CartItem key={id} data={product} setUpdating={setUpdating} />;
          })}
        </animated.ul>
      </animated.div>
      <Notification visible={updating}>{updating ? 'Updating cart...' : 'Cart updated!'}</Notification>
    </CartSection>
  );
});

export default CartItems;
