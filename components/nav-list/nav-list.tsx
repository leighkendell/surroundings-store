import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useMediaLayout } from 'use-media';
import { isBrowser } from '../../lib/helpers';
import styleVars from '../../sass/_variables.scss';
import styles from './nav-list.scss';

interface Props {
  open?: boolean;
}

const NavList: React.FunctionComponent<Props> = React.memo(
  ({ open, children }) => {
    const isWide = isBrowser
      ? useMediaLayout({ minWidth: parseInt(styleVars.breakpointMedium, 10) })
      : false;

    const spring = useSpring({
      from: { transform: 'translate3d(0, 0%, 0)' },
      to: [
        { visibility: open ? 'visible' : '' },
        { transform: `translate3d(0, ${open ? '-100%' : '0%'}, 0)` },
        { visibility: open ? '' : 'hidden' },
      ],
    });

    return (
      <animated.ul className={styles.list} style={isWide ? {} : spring}>
        {children}
      </animated.ul>
    );
  }
);

export default NavList;
