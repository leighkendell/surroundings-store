import React, { ReactNode } from 'react';
import styles from './input-select.scss';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const InputSelect: React.FunctionComponent<Props> = ({ children, ...props }) => (
  <select className={styles.select} {...props}>
    {children}
  </select>
);

export default InputSelect;
