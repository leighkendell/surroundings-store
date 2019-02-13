import React from 'react';
import CartIcon from '../../svg/cart-icon.svg';
import styles from './cart-toggle.scss';

const CartToggle: React.FunctionComponent = () => (
  <div className={styles.cartToggle}>
    <span className={styles.cartTotal}>2</span>
    <CartIcon className={styles.cartToggleIcon} />
  </div>
);

export default CartToggle;
