import classNames from 'classnames';
import React from 'react';
import styles from './wrapper.scss';

interface Props {
  small?: boolean;
  medium?: boolean;
  collapseTop?: boolean;
  collapseBottom?: boolean;
  additionalClass?: string;
}

const Wrapper: React.FunctionComponent<Props> = ({
  children,
  small,
  medium,
  collapseTop,
  collapseBottom,
  additionalClass,
}) => {
  const className = classNames(styles.wrapper, additionalClass, {
    [styles.wrapperSmall]: small,
    [styles.wrapperMedium]: medium,
    [styles.collapseTop]: collapseTop,
    [styles.collapseBottom]: collapseBottom,
  });

  return <div className={className}>{children}</div>;
};

export default Wrapper;
