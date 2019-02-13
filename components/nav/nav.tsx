import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { CartToggle, NavList, NavListItem, NavToggle } from '..';
import getNavigationQuery from '../../graphql/get-navigation';
import updateNavigationMutation from '../../graphql/update-navigation';
import Logo from '../../svg/surroundings-logo.svg';
import styles from './nav.scss';

const Nav: React.FunctionComponent = () => (
  <Query query={getNavigationQuery}>
    {({ data }) => {
      const { isOpen } = data.navigation;

      return (
        <nav className={styles.nav} role="navigation">
          <div className={styles.wrapper}>
            <Mutation mutation={updateNavigationMutation}>
              {updateNavigation => (
                <>
                  <NavToggle open={isOpen} onClick={() => updateNavigation({ variables: { isOpen: !isOpen } })} />
                  <Logo className={styles.logo} />
                  <NavList open={isOpen}>
                    <NavListItem href="/">Home</NavListItem>
                    <NavListItem href="/clothing">Clothing</NavListItem>
                    <NavListItem href="/music">Music</NavListItem>
                    <NavListItem href="/contact">Contact</NavListItem>
                  </NavList>
                  <CartToggle />
                </>
              )}
            </Mutation>
          </div>
        </nav>
      );
    }}
  </Query>
);

export default Nav;
