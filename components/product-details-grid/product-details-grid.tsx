import React from 'react';
import styles from './product-details-grid.scss';

const ProductDetailsGrid: React.FunctionComponent = ({ children }) => <div className={styles.grid}>{children}</div>;

export default ProductDetailsGrid;
