import React from 'react';
import styles from './text.scss';

const Text: React.FunctionComponent = ({ children }) => (
  <p className={styles.text}>{children}</p>
);

export default Text;
