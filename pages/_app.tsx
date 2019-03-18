import { ApolloClient } from 'apollo-boost';
import App, { AppProps, Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Cart, Error, Footer, Main, Nav, Section } from '../components';
import { createCheckout, getCheckoutId, updateCheckoutId } from '../graphql/checkout';
import withApolloClient from '../lib/with-apollo-client';

interface MainAppProps extends AppProps {
  apolloClient: ApolloClient<{}>;
}

const cartError = (
  <Section variation="secondary">
    <Error>Something went wrong, you will not be able to add items to your cart. Please try again later.</Error>
  </Section>
);

class MainApp extends App<MainAppProps> {
  public state = {
    cartErrorVisible: false,
  };

  public componentDidMount() {
    this.initCheckout();
  }

  public render() {
    const { Component, pageProps, apolloClient } = this.props;
    const { cartErrorVisible } = this.state;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Nav />
          <Cart />
          <Main>
            {cartErrorVisible && cartError}
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
    const checkoutIdQuery = await apolloClient.query({
      query: getCheckoutId,
    });

    if (checkoutIdQuery.data.checkoutId) {
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
      this.setState({ cartErrorVisible: true });
    }
  }
}

export default withApolloClient(MainApp);
