import React from 'react';
import styles from './button.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FunctionComponent<Props> = ({ children }) => <button className={styles.button}>{children}</button>;

export default Button;
