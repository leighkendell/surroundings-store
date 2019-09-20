import React from 'react';
import Heading from '../heading/heading';
import styles from './header-text-group.scss';

interface Props {
  firstHeading: string;
  secondHeading: string;
}

const HeaderTextGroup: React.FunctionComponent<Props> = ({
  firstHeading,
  secondHeading,
}) => (
  <header className={styles.header}>
    <Heading type="h1">{firstHeading}</Heading>
    <Heading type="h2">{secondHeading}</Heading>
  </header>
);

export default HeaderTextGroup;
