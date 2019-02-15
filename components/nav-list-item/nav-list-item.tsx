import classNames from 'classnames';
import Link from 'next/link';
import { SingletonRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './nav-list-item.scss';

interface Props {
  href: string;
  router: SingletonRouter;
}

const NavListItem: React.FunctionComponent<Props> = ({ children, href, router }) => {
  const { pathname } = router;
  const [active, setActive] = useState(false);
  const className = classNames(styles.navListItem, { [styles.navListItemActive]: active });

  useEffect(() => {
    setActive(href === pathname);
  });

  return (
    <li className={className}>
      <Link href={href} prefetch={true}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export default withRouter(NavListItem);
