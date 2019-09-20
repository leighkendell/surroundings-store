import React from 'react';
import styles from './product-grid.scss';

const ProductGrid: React.FunctionComponent = ({ children }) => (
  <div className={styles.grid}>{children}</div>
);

export default ProductGrid;
