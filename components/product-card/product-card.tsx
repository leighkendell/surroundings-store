import React from 'react';
import { Button } from '..';
import styles from './product-card.scss';

interface Props {
  title: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
}

const ProductCard: React.FunctionComponent<Props> = ({ title, price, image }) => (
  <div className={styles.card}>
    <div className={styles.image}>
      <img src={image.src} alt={image.alt} />
    </div>
    <div className={styles.content}>
      <span className={styles.title}>{title}</span>
      <strong className={styles.price}>{price}</strong>
      <Button>View product</Button>
    </div>
  </div>
);

export default ProductCard;
