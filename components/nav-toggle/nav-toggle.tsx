import classNames from 'classnames';
import React from 'react';
import styles from './nav-toggle.scss';

interface Props {
  open?: boolean;
}

const NavToggle: React.FunctionComponent<Props> = ({ open }) => {
  const className = classNames(styles.navToggle, { [styles.navToggleOpen]: open });

  return <button className={className} />;
};

export default NavToggle;
