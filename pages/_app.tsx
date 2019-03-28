import * as Sentry from '@sentry/browser';
import { ApolloClient } from 'apollo-boost';
import App, { AppProps, Container, NextAppContext } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactGA from 'react-ga';
import { AppContextWrapper, Cart, Error, ErrorBoundary, Footer, Main, Nav, Section } from '../components';
import { initCheckout } from '../lib/helpers';
import withApolloClient from '../lib/with-apollo-client';

interface MainAppProps extends AppProps {
  apolloClient: ApolloClient<{}>;
  isServerRender: boolean;
}

const cartError = (
  <Section variation="secondary">
    <Error>Something went wrong, you will not be able to add items to your cart. Please try again later.</Error>
  </Section>
);

const browserError = (
  <Section variation="secondary">
    <Error>Dang, it looks like you're using an unsupported browser. You may have difficulties using this site.</Error>
  </Section>
);

class MainApp extends App<MainAppProps> {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Determine if this render came from the server
    const isServerRender = ctx.res !== undefined;

    return {
      pageProps,
      isServerRender,
    };
  }

  public state = {
    cartErrorVisible: false,
    browserErrorVisible: false,
  };

  public componentDidMount() {
    this.browserCheck();
    this.initCheckout();
    this.initGoogleAnalytics();
    this.initSentry();
  }

  public render() {
    const { Component, pageProps, apolloClient, isServerRender } = this.props;
    const { cartErrorVisible, browserErrorVisible } = this.state;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <AppContextWrapper isServerRender={isServerRender}>
            <Nav />
            <ErrorBoundary>
              <Cart />
            </ErrorBoundary>
            <Main>
              {browserErrorVisible && browserError}
              {cartErrorVisible && cartError}
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Main>
            <Footer />
          </AppContextWrapper>
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

  private browserCheck() {
    const script = document.createElement('script');
    this.setState({
      browserErrorVisible: !('noModule' in script),
    });
  }

  private initGoogleAnalytics() {
    const { router } = this.props;
    ReactGA.initialize('UA-136833682-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    router.events.on('routeChangeComplete', (url: string) => {
      ReactGA.pageview(url);
    });
  }

  private initSentry() {
    Sentry.init({
      dsn: 'https://fa81401e0bb540df8f4f03105ffe389a@sentry.io/1422232',
    });
  }
}

export default withApolloClient(MainApp);
