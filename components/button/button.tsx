import classNames from 'classnames';
import React from 'react';
import styles from './button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  basic?: boolean;
  hover?: boolean;
}

const Button: React.FunctionComponent<Props> = ({
  children,
  basic,
  hover,
  ...props
}) => {
  const className = classNames(styles.button, {
    [styles.basic]: basic,
    [styles.hover]: hover,
  });

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
