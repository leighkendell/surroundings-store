import Head from 'next/head';
import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import './layout.scss';

interface Props {
  pageTitle?: string;
  pageDescription?: string;
  router: SingletonRouter;
}

const Layout: React.FunctionComponent<Props> = ({ children, pageTitle, pageDescription, router }) => {
  const rootUrl = 'https://store.surroundings.band';
  const title = `${pageTitle} • Surroundings Store`;
  const url = `${rootUrl}${router.asPath !== '/' ? router.asPath : ''}`;
  const image = `${rootUrl}/static/images/og-default-products.png`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
      </Head>
      {children}
    </>
  );
};

Layout.defaultProps = {
  pageTitle: 'Store',
  pageDescription: `The official merch store of Surroundings, T-shirts, CD's and more!`,
};

export default withRouter(Layout);
