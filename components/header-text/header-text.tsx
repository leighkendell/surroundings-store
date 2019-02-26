import React from 'react';
import { AnimatedHeading, Section, Wrapper } from '..';

const HeaderText: React.FunctionComponent = ({ children }) => {
  return (
    <Section>
      <Wrapper>
        <AnimatedHeading>{children}</AnimatedHeading>
      </Wrapper>
    </Section>
  );
};

export default HeaderText;
