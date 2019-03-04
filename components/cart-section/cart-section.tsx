import classNames from 'classnames';
import React from 'react';
import styles from './cart-section.scss';

interface Props {
  inline?: boolean;
}

const CartSection: React.FunctionComponent<Props> = ({ children, inline }) => {
  const className = classNames(styles.section, {
    [styles.inline]: inline,
  });

  return <div className={className}>{children}</div>;
};

export default CartSection;
