import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './section.scss';

interface Props {
  variation?: 'primary' | 'secondary' | 'dark' | 'light';
  angled?: boolean;
}

const Section: React.FunctionComponent<Props> = ({
  children,
  variation,
  angled,
}) => {
  const className = classNames(styles.section, {
    [styles.sectionAngled]: angled,
  });
  const textColor =
    variation === 'dark' || variation === 'primary'
      ? 'var(--light)'
      : 'var(--dark)';
  const inlineStyles: CSSProperties = {
    '--background': `var(--${variation})`,
    '--color': textColor,
  };

  return (
    <section className={className} style={inlineStyles}>
      {children}
    </section>
  );
};

Section.defaultProps = {
  variation: 'light',
};

export default Section;
