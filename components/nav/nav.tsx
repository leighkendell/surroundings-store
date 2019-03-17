import Link from 'next/link';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { CartToggle, NavList, NavListItem, NavToggle, Wrapper } from '..';
import { getNavigationOpen, updateNavigationOpen } from '../../graphql/navigation';
import Logo from '../../svg/surroundings-logo.svg';
import styles from './nav.scss';

const Nav: React.FunctionComponent = () => (
  <Query query={getNavigationOpen}>
    {({ data }) => {
      const { isOpen } = data.navigation;

      return (
        <nav className={styles.nav} role="navigation">
          <Wrapper additionalClass={styles.wrapper} collapseTop={true} collapseBottom={true}>
            <Mutation mutation={updateNavigationOpen}>
              {mutate => (
                <>
                  <NavToggle open={isOpen} onClick={() => mutate({ variables: { isOpen: !isOpen } })} />
                  <Link href="/" prefetch={true}>
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
