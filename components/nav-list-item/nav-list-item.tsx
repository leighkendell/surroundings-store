import classNames from 'classnames';
import Link from 'next/link';
import { SingletonRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import { updateNavigationOpen } from '../../graphql/navigation';
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
      <Mutation mutation={updateNavigationOpen}>
        {mutate => (
          <Link href={href} prefetch={true}>
            <a onClick={() => mutate({ variables: { isOpen: false } })} role="button">
              {children}
            </a>
          </Link>
        )}
      </Mutation>
    </li>
  );
};

export default withRouter(NavListItem);
