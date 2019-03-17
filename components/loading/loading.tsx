import React from 'react';
import { animated, useSpring } from 'react-spring';
import { Wrapper } from '..';
import styles from './loading.scss';

const Loading: React.FunctionComponent = () => {
  let angle = 0;

  const spring = useSpring({
    from: { transform: 'rotate(0turn)', opacity: 0 },
    to: async next => {
      while (1) {
        angle += 1;
        await next({ transform: `rotate(${angle}turn)`, opacity: 1 });
      }
    },
  });

  return (
    <Wrapper>
      <animated.div className={styles.icon} style={spring} />
    </Wrapper>
  );
};

export default Loading;
