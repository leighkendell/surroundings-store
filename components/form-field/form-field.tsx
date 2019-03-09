import React from 'react';
import styles from './form-field.scss';

const FormField: React.FunctionComponent = ({ children }) => <div className={styles.field}>{children}</div>;

export default FormField;
