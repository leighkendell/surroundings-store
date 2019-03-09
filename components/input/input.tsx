import React from 'react';
import styles from './input.scss';

const Input: React.FunctionComponent<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => (
  <input className={styles.input} {...props} />
);

export default Input;
