import { ApolloClient } from 'apollo-boost';
import App, { AppProps, Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Cart, Error, Footer, Main, Nav, Section } from '../components';
import { initCheckout } from '../lib/helpers';
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

    initCheckout(apolloClient).catch(() => {
      this.setState({ cartErrorVisible: true });
    });
  }
}

export default withApolloClient(MainApp);
