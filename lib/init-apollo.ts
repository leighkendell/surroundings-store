import { ApolloClient, gql, HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

const isBrowser = typeof window !== 'undefined';
let apolloClient: ApolloClient<{}> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

const create = (initialState?: any) => {
  const appCache = new InMemoryCache().restore(initialState || {});
  const checkoutIdLocal = isBrowser ? localStorage.getItem('shopify-checkout-id') : null;

  const typeDefs = gql`
    extend type Query {
      checkoutId: ID!
    }
  `;

  const resolvers = {
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
      updateCheckoutId: (_, { checkoutId }, { cache }) => {
        const data = {
          checkoutId,
        };
        cache.writeData({ data });
        return null;
      },
    },
  };

  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    cache: appCache,
    link: new HttpLink({
      uri: 'https://srrndngs.myshopify.com/api/graphql',
      credentials: 'same-origin',
      headers: {
        'X-Shopify-Storefront-Access-Token': '30727722f2f8fb191b4083f205e6c120',
      },
    }),
    typeDefs,
    resolvers,
  });

  // Initial client state
  appCache.writeData({
    data: {
      navigation: {
        __typename: 'Navigation',
        isOpen: false,
      },
      cart: {
        __typename: 'Cart',
        isOpen: false,
        isReady: false,
      },
      checkoutId: checkoutIdLocal,
    },
  });

  return client;
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
