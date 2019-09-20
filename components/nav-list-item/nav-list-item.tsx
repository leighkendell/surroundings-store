import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { Mutation } from 'react-apollo';
import { updateNavigationOpen } from '../../graphql/navigation';
import styles from './nav-list-item.scss';

interface Props {
  href: string;
  active?: boolean;
}

const NavListItem: React.FunctionComponent<Props> = React.memo(
  ({ children, href, active }) => {
    const className = classNames(styles.navListItem, {
      [styles.navListItemActive]: active,
    });

    return (
      <li className={className}>
        <Mutation<any> mutation={updateNavigationOpen}>
          {mutate => (
            <Link href={href}>
              <a
                onClick={() => mutate({ variables: { isOpen: false } })}
                role="button"
              >
                {children}
              </a>
            </Link>
          )}
        </Mutation>
      </li>
    );
  }
);

export default NavListItem;
