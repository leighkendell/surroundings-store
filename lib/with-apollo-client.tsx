import { ApolloClient } from 'apollo-boost';
import { NextAppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from 'react-apollo';
import { isBrowser } from './helpers';
import initApollo from './init-apollo';

interface ApolloProps {
  apolloState: ApolloClient<{}>;
}

export default (App: any) => {
  return class Apollo extends React.Component<ApolloProps> {
    public static displayName = 'withApollo(App)';
    public static async getInitialProps(ctx: NextAppContext) {
      const { Component, router } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo();
      if (!isBrowser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(<App {...appProps} Component={Component} router={router} apolloClient={apollo} />);
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

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    public apolloClient = initApollo(this.props.apolloState);

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
