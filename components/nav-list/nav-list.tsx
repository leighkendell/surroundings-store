import classNames from 'classnames';
import React from 'react';
import styles from './nav-list.scss';

interface Props {
  open?: boolean;
}

const NavList: React.FunctionComponent<Props> = React.memo(({ open, children }) => {
  const className = classNames(styles.list, { [styles.open]: open });

  return <ul className={className}>{children}</ul>;
});

export default NavList;
