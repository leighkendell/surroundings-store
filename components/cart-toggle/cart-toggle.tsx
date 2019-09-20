import React from 'react';
import { Mutation, MutationFunction } from 'react-apollo';
import ReactGA from 'react-ga';
import { animated, useSpring } from 'react-spring';
import { CheckoutQuery } from '..';
import { updateCartOpen } from '../../graphql/cart';
import CartIcon from '../../svg/cart-icon.svg';
import styles from './cart-toggle.scss';

interface TotalProps {
  total: number;
}

const Total: React.FunctionComponent<TotalProps> = ({ total }) => {
  const hasTotal = total > 0;
  const spring = useSpring({
    transform: `scale(${hasTotal ? '1' : '0'})`,
    from: { transform: `scale(0)` },
  });

  return (
    <animated.span className={styles.total} style={spring}>
      {total}
    </animated.span>
  );
};

const CartToggle: React.FunctionComponent = () => {
  const openCart = (mutate: MutationFunction) => {
    mutate({ variables: { isOpen: true } });

    // Track event
    ReactGA.event({
      category: 'Cart',
      action: 'Opened Cart',
    });
  };

  return (
    <Mutation<any> mutation={updateCartOpen}>
      {mutate => (
        <button
          className={styles.toggle}
          aria-label="Open cart"
          onClick={() => openCart(mutate)}
        >
          <CheckoutQuery>
            {({ lineItems }) => {
              const total = lineItems.edges.length;
              return <Total total={total} />;
            }}
          </CheckoutQuery>
          <CartIcon className={styles.icon} />
        </button>
      )}
    </Mutation>
  );
};

export default CartToggle;
