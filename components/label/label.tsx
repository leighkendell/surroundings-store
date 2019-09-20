import React from 'react';
import styles from './label.scss';

const Label: React.FunctionComponent<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ children, ...props }) => (
  <label className={styles.label} {...props}>
    {children}
  </label>
);

export default Label;
