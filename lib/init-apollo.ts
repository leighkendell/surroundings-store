import { ApolloClient, gql, HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { isBrowser } from './helpers';

let apolloClient: ApolloClient<{}> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

const create = (initialState?: any) => {
  const appCache = new InMemoryCache().restore(initialState || {});
  const checkoutIdLocal = isBrowser ? localStorage.getItem('shopify-checkout-id') : null;

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

  const resolvers = {
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
