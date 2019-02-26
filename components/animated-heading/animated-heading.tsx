import React from 'react';
import { animated, useSpring } from 'react-spring';
import { Heading } from '..';

const AnimatedHeading: React.FunctionComponent = ({ children }) => {
  const SpringHeading = animated(Heading);

  const props = useSpring({
    from: { opacity: 0, transform: 'translateX(-25px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  });

  return (
    <SpringHeading type="h1" style={props}>
      {children}
    </SpringHeading>
  );
};

export default AnimatedHeading;
