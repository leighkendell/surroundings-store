import classNames from 'classnames';
import React from 'react';
import styles from './nav-toggle.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
}

const NavToggle: React.FunctionComponent<Props> = React.memo(
  ({ open, ...props }) => {
    const className = classNames(styles.navToggle, {
      [styles.navToggleOpen]: open,
    });

    return (
      <button
        aria-haspopup={true}
        aria-expanded={open}
        aria-label="Menu"
        className={className}
        {...props}
      />
    );
  }
);

export default NavToggle;
