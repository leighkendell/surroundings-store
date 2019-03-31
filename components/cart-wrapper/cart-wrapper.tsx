import { ApolloClient } from 'apollo-boost';
import React from 'react';
import { Mutation } from 'react-apollo';
import { animated, useSpring } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import { updateCartOpen } from '../../graphql/cart';
import styles from './cart-wrapper.scss';

interface Props {
  client: ApolloClient<any>;
  cart: {
    isOpen: boolean;
  };
}

const CartWrapper: React.FunctionComponent<Props> = ({ children, cart, client }) => {
  const { isOpen } = cart;

  // Springs
  const [{ visibility, xyz, pointerEvents, opacity }, set]: any = useSpring(() => ({
    from: {
      xyz: [100, 0, 0],
      visibility: 'hidden',
      opacity: 0,
      pointerEvents: 'none',
    },
  }));

  // Set values
  set({
    to: [
      { visibility: isOpen ? 'visible' : '', pointerEvents: isOpen ? 'auto' : 'none' },
      { opacity: isOpen ? 1 : 0, xyz: isOpen ? [0, 0, 0] : [100, 0, 0] },
      { visibility: isOpen ? '' : 'hidden' },
    ],
  });

  // Swipe to close
  const bind = useGesture(({ down, delta }) => {
    const [deltaX] = delta;
    const percent = deltaX / 3;

    if (down) {
      if (deltaX > 0) {
        set({
          xyz: [percent, 0, 0],
          opacity: 1 - percent / 100,
        });
      }
    } else {
      if (percent > 25) {
        set({
          xyz: [100, 0, 0],
          opacity: 0,
        });
        client.mutate({
          mutation: updateCartOpen,
          variables: { isOpen: false },
        });
      } else {
        set({
          xyz: [0, 0, 0],
          opacity: 1,
        });
        client.mutate({
          mutation: updateCartOpen,
          variables: { isOpen: true },
        });
      }
    }
  });

  return (
    <aside>
      <Mutation mutation={updateCartOpen}>
        {mutate => (
          <animated.div
            className={styles.background}
            style={{
              pointerEvents,
              opacity,
            }}
            aria-label="Close cart"
            onClick={() => {
              mutate({ variables: { isOpen: false } });
            }}
          />
        )}
      </Mutation>
      <animated.div
        className={styles.wrapper}
        style={{
          visibility,
          transform: xyz.interpolate((x: number, y: number, z: number) => `translate3d(${x}%, ${y}%, ${z}px)`),
        }}
        {...bind()}
      >
        {children}
      </animated.div>
    </aside>
  );
};

export default CartWrapper;
