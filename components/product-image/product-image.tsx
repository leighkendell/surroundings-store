import React from 'react';
import styles from './product-image.scss';

interface Props {
  src: string;
  alt: string;
}

const ProductImage: React.FunctionComponent<Props> = ({ src, alt }) => (
  <div className={styles.wrapper}>
    <img src={src} alt={alt} className={styles.image} />
  </div>
);

export default ProductImage;
