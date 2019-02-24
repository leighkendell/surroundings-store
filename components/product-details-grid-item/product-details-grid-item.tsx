import React from 'react';
import Wrapper from '../wrapper/wrapper';
import styles from './product-details-grid-item.scss';

const ProductDetailsGridItem: React.FunctionComponent = ({ children }) => (
  <div className={styles.item}>
    <Wrapper small={true}>{children}</Wrapper>
  </div>
);

export default ProductDetailsGridItem;
