import React from 'react';
import ReactDOM from 'react-dom';
import { animated, useTransition } from 'react-spring';
import { isBrowser } from '../../lib/helpers';
import styles from './notification.scss';

const notificationEl = isBrowser ? document.body : null;

interface Props {
  visible: boolean;
}

const Notification: React.FunctionComponent<Props> = ({ children, visible }) => {
  const transitions = useTransition<{}, {}>(visible, null, {
    from: { transform: `translateY(150%)` },
    enter: { transform: `translateY(0)` },
    leave: { transform: `translateY(150%)` },
    trail: 2000,
  });

  return (
    notificationEl &&
    ReactDOM.createPortal(
      transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div className={styles.notification} key={key} style={props}>
              {children}
            </animated.div>
          )
      ),
      notificationEl
    )
  );
};

export default Notification;
