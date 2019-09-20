import Link from 'next/link';
import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { CartToggle, NavList, NavListItem, NavToggle, Wrapper } from '..';
import { getNavigationOpen, updateNavigationOpen } from '../../graphql/navigation';
import { Navigation } from '../../interfaces';
import Logo from '../../svg/surroundings-logo.svg';
import { navItems } from '../../utils/nav-items';
import styles from './nav.scss';

interface Props {
  router: SingletonRouter;
}

const Nav: React.FunctionComponent<Props> = React.memo(({ router }) => {
  const { pathname } = router;

  return (
    <nav className={styles.nav} role="navigation">
      <Wrapper additionalClass={styles.wrapper} collapseTop={true} collapseBottom={true}>
        <Query<Navigation> query={getNavigationOpen}>
          {({ data }) => {
            if (data && data.navigation) {
              const { isOpen } = data.navigation;
              return (
                <>
                  <Mutation<any> mutation={updateNavigationOpen}>
                    {mutate => <NavToggle open={isOpen} onClick={() => mutate({ variables: { isOpen: !isOpen } })} />}
                  </Mutation>
                  <Link href="/">
                    <a className={styles.logo} aria-label="Home page">
                      <Logo />
                    </a>
                  </Link>
                  <NavList open={isOpen}>
                    {navItems.map(({ path, name }) => (
                      <NavListItem href={path} key={name} active={path === pathname}>
                        {name}
                      </NavListItem>
                    ))}
                  </NavList>
                  <CartToggle />
                </>
              );
            }
            return null;
          }}
        </Query>
      </Wrapper>
    </nav>
  );
});

export default withRouter(Nav);
