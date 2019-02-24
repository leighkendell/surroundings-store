import React, { ReactNode } from 'react';
import styles from './input-select.scss';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const InputSelect: React.FunctionComponent<Props> = ({ children }) => (
  <select className={styles.select}>{children}</select>
);

export default InputSelect;
