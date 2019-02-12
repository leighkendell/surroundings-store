import React from 'react';
import styles from './nav-list-item.scss';

const NavListItem: React.FunctionComponent = ({ children }) => (
  <li className={styles.navListItem}>
    <a href="">{children}</a>
  </li>
);

export default NavListItem;
