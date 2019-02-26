import { ApolloClient } from 'apollo-boost';
import App, { AppProps, Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Cart, Footer, Nav } from '../components';
import { createCheckout, updateCheckout } from '../graphql/checkout';
import withApolloClient from '../lib/with-apollo-client';

interface MainAppProps extends AppProps {
  apolloClient: ApolloClient<{}>;
}

class MainApp extends App<MainAppProps> {
  public componentDidMount() {
    this.initCheckout();
  }

  public render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Nav />
          <Cart />
          <Component {...pageProps} />
          <Footer />
        </ApolloProvider>
      </Container>
    );
  }

  private async initCheckout() {
    const { localStorage } = window;
    const { apolloClient } = this.props;

    // Exit if the checkout already exists
    if (localStorage.getItem('shopify-checkout')) {
      return;
    }

    try {
      // Get a new checkout
      const createCheckoutMutation = await apolloClient.mutate({
        mutation: createCheckout,
        variables: { input: {} },
      });

      // Set to local state and persist to localStorage
      const { checkout } = createCheckoutMutation.data.checkoutCreate;
      apolloClient.mutate({
        mutation: updateCheckout,
        variables: { checkout },
      });
      window.localStorage.setItem('shopify-checkout', JSON.stringify(checkout));
    } catch {
      // TODO: Error handling
    }
  }
}

export default withApolloClient(MainApp);
