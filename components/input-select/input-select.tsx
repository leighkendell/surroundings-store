import React, { ReactNode } from 'react';
import styles from './input-select.scss';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  label?: string;
}

const InputSelect: React.FunctionComponent<Props> = ({ children, onChange, value, required, id, label }) => (
  <>
    {label && (
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    )}
    <select id={id} className={styles.select} onChange={onChange} value={value} required={required}>
      {children}
    </select>
  </>
);

export default InputSelect;
