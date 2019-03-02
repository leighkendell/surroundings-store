import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { animated, useSpring } from 'react-spring';
import { updateCartOpen } from '../../graphql/cart';
import { getCheckout } from '../../graphql/checkout';
import CartIcon from '../../svg/cart-icon.svg';
import styles from './cart-toggle.scss';

interface Props {
  isReady: boolean;
}

interface TotalProps {
  total: number;
}

const Total: React.FunctionComponent<TotalProps> = ({ total }) => {
  const hasTotal = total > 0;
  const spring = useSpring({
    transform: `scale(${hasTotal ? '1' : '0'})`,
  });

  return (
    <animated.span className={styles.total} style={spring}>
      {total}
    </animated.span>
  );
};

const CartToggle: React.FunctionComponent<Props> = ({ isReady }) => (
  <Mutation mutation={updateCartOpen}>
    {updateCartOpenMutation => (
      <button
        className={styles.toggle}
        aria-label="Open cart"
        onClick={() => updateCartOpenMutation({ variables: { isOpen: true } })}
      >
        <Query query={getCheckout} variables={{ isReady }}>
          {({ data }) => {
            if (data) {
              const total = data.node && data.node.lineItems.edges.length;
              return <Total total={total} />;
            }
          }}
        </Query>
        <CartIcon className={styles.icon} />
      </button>
    )}
  </Mutation>
);

export default CartToggle;
