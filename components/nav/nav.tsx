import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { CartToggle, NavList, NavListItem, NavToggle } from '..';
import getNavigationQuery from '../../graphql/getNavigation';
import updateNavigationMutation from '../../graphql/updateNavigation';
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
                    <NavListItem>Home</NavListItem>
                    <NavListItem>Clothing</NavListItem>
                    <NavListItem>Music</NavListItem>
                    <NavListItem>Contact</NavListItem>
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
