import Link from 'next/link';
import React from 'react';
import styles from './nav-list-item.scss';

interface Props {
  href: string;
}

const NavListItem: React.FunctionComponent<Props> = ({ children, href }) => (
  <li className={styles.navListItem}>
    <Link href={href} prefetch={true}>
      <a>{children}</a>
    </Link>
  </li>
);

export default NavListItem;
