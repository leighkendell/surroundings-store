import classNames from 'classnames';
import React from 'react';
import styles from './button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  basic?: boolean;
}

const Button: React.FunctionComponent<Props> = ({ children, basic, onClick }) => {
  const className = classNames(styles.button, { [styles.basic]: basic });

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
