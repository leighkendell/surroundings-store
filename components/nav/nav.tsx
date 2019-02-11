import React from 'react';
import { NavToggle } from '..';
import Logo from '../../svg/surroundings-logo.svg';
import styles from './nav.scss';

const Nav: React.FunctionComponent = () => (
  <nav className={styles.nav} role="navigation">
    <div className={styles.wrapper}>
      <NavToggle open={false} />
      <Logo className={styles.logo} />
    </div>
  </nav>
);

export default Nav;
