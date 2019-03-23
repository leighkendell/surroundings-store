import classNames from 'classnames';
import React from 'react';
import styles from './form-field.scss';

interface Props {
  hidden?: boolean;
}

const FormField: React.FunctionComponent<Props> = ({ children, hidden }) => {
  const className = classNames(styles.field, { [styles.hidden]: hidden });

  return (
    <div className={className} aria-hidden={hidden}>
      {children}
    </div>
  );
};

export default FormField;
