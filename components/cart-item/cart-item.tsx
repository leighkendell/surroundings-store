import React from 'react';
import { CheckoutLineItemEdge } from '../../interfaces';
import { formatCurrency } from '../../lib/helpers';
import styles from './cart-item.scss';

interface Props {
  data: CheckoutLineItemEdge;
}

const CartItem: React.FunctionComponent<Props> = ({ data }) => {
  const { title, variant } = data.node;

  return (
    <li className={styles.item}>
      <div className={styles.image}>
        <img src={variant.image.transformedSrc} alt={variant.image.altText} />
      </div>
      <div className={styles.details}>
        <span>{title}</span>
        <span>
          {variant.title}, {formatCurrency('AUD', parseFloat(variant.price))}
        </span>
      </div>
      <button className={styles.button}>Remove</button>
    </li>
  );
};

export default CartItem;
