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
      transform: 'translate3d(100%, 0, 0)',
      visibility: 'hidden',
    },
    to: [
      { visibility: isOpen ? 'visible' : '' },
      { transform: `translate3d(${isOpen ? '0%' : '100%'}, 0, 0)` },
      { visibility: isOpen ? '' : 'hidden' },
    ],
  });

  return (
    <aside>
      <Mutation<any> mutation={updateCartOpen}>
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
      <animated.div className={styles.wrapper} style={wrapperSpring}>
        {children}
      </animated.div>
    </aside>
  );
};

export default CartWrapper;
