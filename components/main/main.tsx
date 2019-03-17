import React from 'react';
import styles from './main.scss';

const Main: React.FunctionComponent = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
