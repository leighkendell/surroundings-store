import { RouterProps, SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { animated, useTransition } from 'react-spring';
import styles from './main.scss';

interface Props {
  router: SingletonRouter;
}

const Main: React.FunctionComponent<Props> = ({ children, router }) => {
  const transitions = useTransition<RouterProps, {}>(router, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, visibility: 'hidden', height: 0 },
  });

  return (
    <main className={styles.main}>
      {transitions.map(({ props, key }) => (
        <animated.div key={key} style={props}>
          {children}
        </animated.div>
      ))}
    </main>
  );
};

export default withRouter(Main);
