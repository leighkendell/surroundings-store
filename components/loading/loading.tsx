import React from 'react';
import { animated, useSpring } from 'react-spring';
import { Wrapper } from '..';
import styles from './loading.scss';

const Loading: React.FunctionComponent = () => {
  let angle = 0;

  const spring = useSpring({
    from: { transform: 'rotate(0turn)' },
    to: async (next: any) => {
      while (1) {
        await next({ transform: `rotate(${(angle += 0.25)}turn)` });
        await next({ transform: `rotate(${(angle += 0.75)}turn)` });
        await next({ transform: `rotate(${(angle += 0.5)}turn)` });
        await next({ transform: `rotate(${(angle += 1)}turn)` });
      }
    },
  });

  return (
    <Wrapper>
      <div className={styles.container} aria-label="Loading">
        <animated.span className={styles.icon} style={spring} />
      </div>
    </Wrapper>
  );
};

export default Loading;
