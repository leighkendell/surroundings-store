import React from 'react';
import { Wrapper } from '..';
import styles from './error.scss';

const Error: React.FunctionComponent = ({ children }) => (
  <Wrapper>
    <div className={styles.error}>
      <span className={styles.icon} role="img" aria-label="Sad face">
        😔
      </span>
      {children}
    </div>
  </Wrapper>
);

export default Error;
