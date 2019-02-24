import React from 'react';
import { Section, Wrapper } from '..';
import { AnimatedHeading } from '..';

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
