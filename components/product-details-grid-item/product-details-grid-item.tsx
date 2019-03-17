import React from 'react';
import { animated, useSpring } from 'react-spring';
import Wrapper from '../wrapper/wrapper';
import styles from './product-details-grid-item.scss';

interface Props {
  slideIn?: boolean;
}

const ProductDetailsGridItem: React.FunctionComponent<Props> = ({ children, slideIn }) => {
  const spring = useSpring({
    from: {
      opacity: 0,
      transform: `${slideIn ? 'translateX(-25px)' : ''}`,
    },
    opacity: 1,
    transform: `${slideIn ? 'translateX(0px)' : ''}`,
    delay: slideIn ? 250 : 0,
  });

  return (
    <animated.div className={styles.item} style={spring}>
      <Wrapper small={true}>{children}</Wrapper>
    </animated.div>
  );
};

export default ProductDetailsGridItem;
