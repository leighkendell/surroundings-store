import classNames from 'classnames';
import Link from 'next/link';
import Router, { SingletonRouter, withRouter } from 'next/router';
import React, { useState } from 'react';
import { UrlObject } from 'url';
import { Button, Image } from '..';
import { Product } from '../../interfaces';
import { formatCurrency, getTheme } from '../../lib/helpers';
import styles from './product-card.scss';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  data: Product;
  router: SingletonRouter;
}

const ProductCard: React.FunctionComponent<Props> = React.memo(
  React.forwardRef<HTMLAnchorElement, Props>(
    ({ data: { handle, title, priceRange, images, tags, productType } }, ref) => {
      // State
      const [hover, setHover] = useState(false);
      const [touchmoved, setTouchmoved] = useState(false);

      // Vars
      const { amount, currencyCode } = priceRange.minVariantPrice;
      const price = formatCurrency(currencyCode, amount);
      const [mainImage] = images.edges;
      const theme = getTheme(tags) || 'theme-1';
      const fullWidthImage = productType === 'Music';
      const imageClasses = classNames(styles.image, { [styles.imagefull]: fullWidthImage });

      // Routing
      const url: UrlObject = {
        pathname: '/product',
        query: { handle },
      };
      const asUrl = `/product/${handle}`;

      return (
        <Link href={url} as={asUrl} prefetch={true}>
          <a
            className={styles.card}
            style={{ '--theme': `var(--${theme})` }}
            ref={ref}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchMove={() => setTouchmoved(true)}
            onTouchStart={() => setTouchmoved(false)}
            onTouchEnd={() => {
              if (!touchmoved) {
                Router.push(url, asUrl);
              }
            }}
          >
            <div className={imageClasses}>
              {mainImage && <Image src={mainImage.node.transformedSrc} alt={mainImage.node.altText || title} />}
            </div>
            <div className={styles.content}>
              <span className={styles.title}>{title}</span>
              <strong className={styles.price}>{price}</strong>
              <Button hover={hover} role="button">
                View product
              </Button>
            </div>
          </a>
        </Link>
      );
    }
  )
);

export default withRouter(ProductCard);
