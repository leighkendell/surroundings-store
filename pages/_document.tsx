import Document, { Head, Main, NextDocumentContext, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  public render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="preconnect" href="https://use.typekit.net" />
          <link rel="stylesheet" href="https://use.typekit.net/nfn4mpw.css" />
          <link rel="stylesheet" href="/static/css/normalize.css" />
          <meta name="theme-color" content="#000" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
          <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#000000" />
          <link rel="shortcut icon" href="/static/icons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="msapplication-config" content="/static/browserconfig.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
