import React from 'react';
import Facebook from '../../svg/facebook.svg';
import Instagram from '../../svg/instagram.svg';
import Twitter from '../../svg/twitter.svg';
import styles from './social-icons.scss';

const SocialIcons: React.FunctionComponent = () => (
  <div className={styles.wrapper}>
    {/* tslint:disable:react-a11y-anchors */}
    <a href="https://www.facebook.com/surroundingsau" aria-label="Facebook">
      <Facebook />
    </a>
    <a href="https://instagram.com/surroundingsau" aria-label="Instagram">
      <Instagram />
    </a>
    <a href="https://twitter.com/surroundingsau" aria-label="Twitter">
      <Twitter />
    </a>
    {/* tslint:enable */}
  </div>
);

export default SocialIcons;
