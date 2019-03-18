import React from 'react';
import { Mutation } from 'react-apollo';
import { animated, useSpring } from 'react-spring';
import { updateCartOpen } from '../../graphql/cart';
import styles from './cart-wrapper.scss';

interface Props {
  cart: {
    isOpen: boolean;
  };
}

const CartWrapper: React.FunctionComponent<Props> = ({ children, cart }) => {
  const { isOpen } = cart;

  // Springs
  const backgroundSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
  });

  const wrapperSpring = useSpring({
    from: {
      transform: 'translateX(100%)',
      visibility: 'hidden',
    },
    to: [
      { visibility: isOpen ? 'visible' : '' },
      { transform: `translateX(${isOpen ? '0%' : '100%'})` },
      { visibility: isOpen ? '' : 'hidden' },
    ],
  });

  return (
    <>
      <Mutation mutation={updateCartOpen}>
        {updateCartOpenMutation => (
          <animated.div
            className={styles.background}
            style={backgroundSpring}
            aria-label="Close cart"
            onClick={() => {
              updateCartOpenMutation({ variables: { isOpen: false } });
            }}
          />
        )}
      </Mutation>
      <animated.aside className={styles.wrapper} style={wrapperSpring}>
        {children}
      </animated.aside>
    </>
  );
};

export default CartWrapper;
