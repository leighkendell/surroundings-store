import React, { useMemo } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, Resolvers } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';
import { isBrowser } from './helpers';

let apolloClient: any = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: any) => {
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      [apolloClient, apolloState]
    );
    return (
      <ApolloProvider client={client}>
        <PageComponent apolloClient={client} {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient());

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState?: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  const appCache = new InMemoryCache().restore(initialState);
  const checkoutIdLocal = isBrowser
    ? localStorage.getItem('shopify-checkout-id')
    : null;

  const typeDefs = gql`
    type Navigation {
      isOpen: Boolean!
    }

    type Cart {
      isOpen: Boolean!
    }

    extend type Query {
      checkoutId: ID!
      navigation: Navigation
      cart: Cart
    }
  `;

  const resolvers: Resolvers = {
    Mutation: {
      updateNavigationOpen: (_, { isOpen }, { cache }) => {
        const data = {
          navigation: {
            __typename: 'Navigation',
            isOpen,
          },
        };
        cache.writeData({ data });
      },
      updateCartOpen: (_, { isOpen }, { cache }) => {
        const data = {
          cart: {
            __typename: 'Cart',
            isOpen,
          },
        };
        cache.writeData({ data });
      },
      updateCheckoutId: (_, { checkoutId }, { cache }) => {
        const data = { checkoutId };
        cache.writeData({ data });
      },
    },
  };

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'https://srrndngs.myshopify.com/api/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
      headers: {
        'X-Shopify-Storefront-Access-Token': '30727722f2f8fb191b4083f205e6c120',
      },
    }),
    cache: appCache,
    typeDefs,
    resolvers,
  });

  // Initial client state
  appCache.writeData({
    data: {
      checkoutId: checkoutIdLocal,
      navigation: {
        __typename: 'Navigation',
        isOpen: false,
      },
      cart: {
        __typename: 'Cart',
        isOpen: false,
      },
    },
  });

  return client;
}
