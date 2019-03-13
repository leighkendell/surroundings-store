import Link from 'next/link';
import React from 'react';
import { Button } from '..';
import { Product } from '../../interfaces';
import { formatCurrency, getTheme } from '../../lib/helpers';
import styles from './product-card.scss';

interface Props {
  data: Product;
}

const ProductCard: React.FunctionComponent<Props> = ({ data: { handle, title, priceRange, images, tags } }) => {
  const { amount, currencyCode } = priceRange.minVariantPrice;
  const price = formatCurrency(currencyCode, amount);
  const [mainImage] = images.edges;
  const theme = getTheme(tags) || 'theme-1';

  return (
    <Link href={`/product?handle=${handle}&title=${title}`} as={`/product/${handle}`}>
      <a className={styles.card} style={{ '--theme': `var(--${theme})` }}>
        <div className={styles.image}>
          {mainImage && <img src={mainImage.node.transformedSrc} alt={mainImage.node.altText} />}
        </div>
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <strong className={styles.price}>{price}</strong>
          <Button>View product</Button>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
