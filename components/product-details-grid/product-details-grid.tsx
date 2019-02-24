import React from 'react';
import styles from './product-details-grid.scss';

interface Props {
  theme?: string;
}

const ProductDetailsGrid: React.FunctionComponent<Props> = ({ children, theme }) => (
  <div className={styles.grid} style={{ '--theme': `var(--${theme})` }}>
    {children}
  </div>
);

ProductDetailsGrid.defaultProps = {
  theme: 'theme-1',
};

export default ProductDetailsGrid;
