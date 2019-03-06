import React from 'react';
import { ImageConnection } from '../../interfaces';
import styles from './product-image.scss';

interface Props {
  images: ImageConnection;
}

const ProductImage: React.FunctionComponent<Props> = ({ images }) => (
  <>
    {images.edges.map(({ node }) => (
      <div className={styles.wrapper} key={node.id}>
        <img src={node.transformedSrc} alt={node.altText} className={styles.image} />
      </div>
    ))}
  </>
);

export default ProductImage;
