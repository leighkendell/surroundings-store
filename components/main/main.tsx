import React from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './main.scss';

interface Props {
  loading: boolean;
}

const Main: React.FunctionComponent<Props> = ({ children, loading }) => {
  const spring = useSpring({
    opacity: loading ? 0 : 1,
  });

  return (
    <animated.main style={spring} className={styles.main}>
      {children}
    </animated.main>
  );
};

export default Main;
