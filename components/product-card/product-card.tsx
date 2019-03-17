import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '..';
import { Product } from '../../interfaces';
import { formatCurrency, getTheme } from '../../lib/helpers';
import styles from './product-card.scss';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  data: Product;
}

const ProductCard: React.FunctionComponent<Props> = React.memo(
  React.forwardRef<HTMLAnchorElement, Props>(({ data: { handle, title, priceRange, images, tags } }, ref) => {
    const [hover, setHover] = useState(false);
    const { amount, currencyCode } = priceRange.minVariantPrice;
    const price = formatCurrency(currencyCode, amount);
    const [mainImage] = images.edges;
    const theme = getTheme(tags) || 'theme-1';

    return (
      <Link href={`/product?handle=${handle}`} as={`/product/${handle}`} prefetch={true}>
        <a
          className={styles.card}
          style={{ '--theme': `var(--${theme})` }}
          ref={ref}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className={styles.image}>
            {mainImage && <img src={mainImage.node.transformedSrc} alt={mainImage.node.altText} />}
          </div>
          <div className={styles.content}>
            <span className={styles.title}>{title}</span>
            <strong className={styles.price}>{price}</strong>
            <Button hover={hover}>View product</Button>
          </div>
        </a>
      </Link>
    );
  })
);

export default ProductCard;
