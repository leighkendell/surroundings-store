import React from 'react';
import styles from './form-group.scss';

const FormGroup: React.FunctionComponent = ({ children }) => (
  <div className={styles.group} role="group">
    {children}
  </div>
);

export default FormGroup;
