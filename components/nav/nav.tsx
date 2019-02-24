import Link from 'next/link';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { CartToggle, NavList, NavListItem, NavToggle, Wrapper } from '..';
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
          <Wrapper additionalClass={styles.wrapper} collapseTop={true} collapseBottom={true}>
            <Mutation mutation={updateNavigationMutation}>
              {updateNavigation => (
                <>
                  <NavToggle open={isOpen} onClick={() => updateNavigation({ variables: { isOpen: !isOpen } })} />
                  <Link href="/">
                    <a className={styles.logo} aria-label="Link to home page">
                      <Logo />
                    </a>
                  </Link>
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
          </Wrapper>
        </nav>
      );
    }}
  </Query>
);

export default Nav;
