import React from 'react';
import { SocialIcons, Wrapper } from '..';
import styles from './footer.scss';

const currentYear = new Date().getFullYear();

const Footer: React.FunctionComponent = React.memo(() => (
  <footer role="contentinfo" className={styles.footer}>
    <Wrapper additionalClass={styles.wrapper}>
      <strong>&copy; {currentYear} Surroundings</strong>
      <SocialIcons />
    </Wrapper>
  </footer>
));

export default Footer;
