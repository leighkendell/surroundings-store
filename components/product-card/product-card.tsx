import Link from 'next/link';
import React from 'react';
import { Button } from '..';
import styles from './product-card.scss';

interface Props {
  title: string;
  price: string;
  path: string;
  image: {
    src: string;
    alt: string;
  };
}

const ProductCard: React.FunctionComponent<Props> = ({ title, price, image, path }) => (
  <Link href={`/product?handle=${path}&title=${title}`} as={`/product/${path}`}>
    <a className={styles.card}>
      <div className={styles.image}>
        <img src={image.src} alt={image.alt} />
      </div>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <strong className={styles.price}>{price}</strong>
        <Button className={styles.button}>View product</Button>
      </div>
    </a>
  </Link>
);

export default ProductCard;
