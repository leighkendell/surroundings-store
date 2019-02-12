import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { withClientState } from 'apollo-link-state';
import fetch from 'isomorphic-unfetch';

const isBrowser = typeof window !== 'undefined';
let apolloClient: ApolloClient<{}> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

const create = (initialState?: any) => {
  const cache = new InMemoryCache().restore(initialState || {});

  const defaults = {
    navigation: {
      __typename: 'Navigation',
      isOpen: false,
    },
  };

  const stateLink = withClientState({
    cache,
    defaults,
    resolvers: {
      Mutation: {
        updateNavigation: (_, { isOpen }, { cache }) => {
          const data = {
            navigation: {
              __typename: 'Navigation',
              isOpen,
            },
          };
          cache.writeData({ data });
          return null;
        },
      },
    },
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: ApolloLink.from([
      stateLink,
      new HttpLink({
        uri: 'https://srrndngs.myshopify.com/api/graphql',
        credentials: 'same-origin',
        headers: {
          'X-Shopify-Storefront-Access-Token': '30727722f2f8fb191b4083f205e6c120',
        },
      }),
    ]),
    cache,
  });
};

export default function initApollo(initialState?: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
