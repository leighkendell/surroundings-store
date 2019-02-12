import classNames from 'classnames';
import React from 'react';
import styles from './nav-list.scss';

interface Props {
  open?: boolean;
}

const NavList: React.FunctionComponent<Props> = ({ open, children }) => {
  const className = classNames(styles.navList, { [styles.navListOpen]: open });
  return <ul className={className}>{children}</ul>;
};

export default NavList;
