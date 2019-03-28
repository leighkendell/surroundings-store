import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { AppContext, Wrapper } from '..';
import styles from './product-details-grid-item.scss';

interface Props {
  slideIn?: boolean;
}

const ProductDetailsGridItem: React.FunctionComponent<Props> = ({ children, slideIn }) => {
  const { isServerRender } = useContext(AppContext);

  // For some reason setting "immediate" when this page is server rendered doesn't seem to discard the "from" state of the spring, so just set to an empty style object
  const spring = !isServerRender
    ? useSpring({
        from: {
          opacity: 0,
          transform: `${slideIn ? 'translate3d(-25px, 0, 0)' : ''}`,
        },
        opacity: 1,
        transform: `${slideIn ? 'translate3d(0px, 0, 0)' : ''}`,
        delay: slideIn ? 250 : 0,
      })
    : {};

  return (
    <animated.div className={styles.item} style={spring}>
      <Wrapper small={true}>{children}</Wrapper>
    </animated.div>
  );
};

export default ProductDetailsGridItem;
