import React from 'react';
import styles from './heading.scss';

interface Props {
  type: 'h1' | 'h2' | 'h3';
}

const Heading: React.FunctionComponent<Props> = ({ type, children }) => {
  const Tag = type;

  return <Tag className={styles[type]}>{children}</Tag>;
};

Heading.defaultProps = {
  type: 'h1',
};

export default Heading;
