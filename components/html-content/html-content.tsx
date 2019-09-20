import React from 'react';
import styles from './html-content.scss';

interface Props {
  children: string;
}

const HtmlContent: React.FunctionComponent<Props> = ({ children }) => (
  <div
    dangerouslySetInnerHTML={{ __html: children }}
    className={styles.content}
  />
);

export default HtmlContent;
