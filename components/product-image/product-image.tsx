import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { Image } from '..';
import { ImageConnection } from '../../interfaces';
import styles from './product-image.scss';

interface Props {
  images: ImageConnection;
}

const ProductImage: React.FunctionComponent<Props> = ({ images }) => {
  const [imageReady, setImageReady] = useState(false);

  const spring = useSpring({
    from: {
      transform: 'translateY(40px) scale(0.95)',
      opacity: 0,
    },
    transform: imageReady ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
    opacity: imageReady ? 1 : 0,
  });

  const imageLoaded = () => {
    setImageReady(true);
  };

  return (
    <>
      {images.edges.map(({ node }) => (
        <animated.div className={styles.wrapper} key={node.id} style={spring}>
          <Image
            src={node.transformedSrc}
            alt={node.altText || 'Product image'}
            className={styles.image}
            imageLoaded={imageLoaded}
          />
        </animated.div>
      ))}
    </>
  );
};

export default ProductImage;
