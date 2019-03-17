import React from 'react';
import { animated, useSpring } from 'react-spring';
import { ImageConnection } from '../../interfaces';
import styles from './product-image.scss';

interface Props {
  images: ImageConnection;
}

const ProductImage: React.FunctionComponent<Props> = ({ images }) => {
  const spring = useSpring({
    from: { transform: 'translateY(40px) scale(0.95)' },
    transform: 'translateY(0) scale(1)',
  });

  return (
    <>
      {images.edges.map(({ node }) => (
        <animated.div className={styles.wrapper} key={node.id} style={spring}>
          <img src={node.transformedSrc} alt={node.altText} className={styles.image} />
        </animated.div>
      ))}
    </>
  );
};

export default ProductImage;
