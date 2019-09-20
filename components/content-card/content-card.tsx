import React from 'react';
import styles from './content-card.scss';

const ContentCard: React.FunctionComponent = ({ children }) => (
  <div className={styles.card}>{children}</div>
);

export default ContentCard;
