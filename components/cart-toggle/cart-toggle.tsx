import React from 'react';
import { Mutation } from 'react-apollo';
import { updateCartOpen } from '../../graphql/cart';
import CartIcon from '../../svg/cart-icon.svg';
import styles from './cart-toggle.scss';

const CartToggle: React.FunctionComponent = () => (
  <Mutation mutation={updateCartOpen}>
    {updateCartOpenMutation => (
      <button className={styles.toggle} onClick={() => updateCartOpenMutation({ variables: { isOpen: true } })}>
        <span className={styles.total}>2</span>
        <CartIcon className={styles.icon} />
      </button>
    )}
  </Mutation>
);

export default CartToggle;
