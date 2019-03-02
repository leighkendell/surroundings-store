import React from 'react';
import styles from './cart-item.scss';

// interface Props {}

const CartItem: React.FunctionComponent = () => (
  <li className={styles.item}>
    <div className={styles.image}>
      <img src="" alt="" />
    </div>
    <div className={styles.details}>
      <span>Diamond pocket tee</span>
      <span>Large, $34.95</span>
    </div>
    <button className={styles.button}>Remove</button>
  </li>
);

export default CartItem;
