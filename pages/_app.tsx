import { ApolloClient } from 'apollo-boost';
import App, { AppProps, Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Cart, Footer, Main, Nav } from '../components';
import { createCheckout, updateCheckoutId } from '../graphql/checkout';
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
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
        </ApolloProvider>
      </Container>
    );
  }

  private async initCheckout() {
    const { apolloClient } = this.props;

    // Exit if the checkout already exists
    if (localStorage.getItem('shopify-checkout-id')) {
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

      await apolloClient.mutate({
        mutation: updateCheckoutId,
        variables: { checkoutId: checkout.id },
      });

      localStorage.setItem('shopify-checkout-id', checkout.id);
    } catch {
      // TODO: Error handling
    }
  }
}

export default withApolloClient(MainApp);
