import React from 'react';
import { animated, useSpring } from 'react-spring';
import { Heading, Section, Wrapper } from '..';

const HeaderText: React.FunctionComponent = ({ children }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-25px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  const AnimatedHeading = animated(Heading);

  return (
    <Section>
      <Wrapper>
        <AnimatedHeading type="h1" style={props}>
          {children}
        </AnimatedHeading>
      </Wrapper>
    </Section>
  );
};

export default HeaderText;
