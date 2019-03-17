import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useMediaLayout } from 'use-media';
import styleVars from '../../sass/_variables.scss';
import styles from './nav-list.scss';

interface Props {
  open?: boolean;
}

const NavList: React.FunctionComponent<Props> = React.memo(({ open, children }) => {
  const isWide = useMediaLayout({ minWidth: parseInt(styleVars.breakpointMedium, 10) });

  const spring = useSpring({
    from: { transform: 'translateY(0%)' },
    to: [
      { visibility: open ? 'visible' : '' },
      { transform: `translateY(${open ? '-100%' : '0%'})` },
      { visibility: open ? '' : 'hidden' },
    ],
  });

  return (
    <animated.ul className={styles.list} style={isWide ? {} : spring}>
      {children}
    </animated.ul>
  );
});

export default NavList;
