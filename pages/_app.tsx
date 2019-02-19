import { ApolloClient } from 'apollo-boost';
import App, { AppProps, Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Footer, Nav } from '../components';
import withApolloClient from '../lib/with-apollo-client';

interface MainAppProps extends AppProps {
  apolloClient: ApolloClient<{}>;
}

class MainApp extends App<MainAppProps> {
  public render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MainApp);
