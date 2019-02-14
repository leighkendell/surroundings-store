import React from 'react';
import { Heading, Section, Wrapper } from '..';

const HeaderText: React.FunctionComponent = ({ children }) => (
  <Section>
    <Wrapper>
      <Heading type="h1">{children}</Heading>
    </Wrapper>
  </Section>
);

export default HeaderText;
