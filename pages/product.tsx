import Head from 'next/head';
import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import {
  Error,
  HeaderTextGroup,
  HtmlContent,
  Layout,
  Loading,
  ProductDetailsGrid,
  ProductDetailsGridItem,
  ProductForm,
  ProductImage,
  Section,
} from '../components';
import { productByHandle } from '../graphql/products';
import { Product as ProductInterface } from '../interfaces';
import { formatCurrency, getTheme } from '../lib/helpers';

interface Router extends SingletonRouter {
  query: {
    handle: string;
  };
}

interface Props {
  router: Router;
}

interface Data {
  productByHandle: ProductInterface;
}

const errorMessage = <Error>We're having issues loading this product. Please try again later.</Error>;

const ProductPage: React.FunctionComponent<Props> = React.memo(({ router }) => {
  const { handle } = router.query;

  return (
    <Layout pageTitle="Loading...">
      <Query<Data> query={productByHandle} variables={{ handle }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />;
          }

          if (error) {
            return errorMessage;
          }

          if (data && data.productByHandle) {
            const product = data.productByHandle;
            const { title, descriptionHtml, images, variants, priceRange, tags } = product;
            const { amount, currencyCode } = priceRange.minVariantPrice;
            const price = formatCurrency(currencyCode, amount);
            const theme = getTheme(tags);

            return (
              <>
                <Head>
                  <title>{title} • Surroundings Store</title>
                </Head>
                <Section>
                  <ProductDetailsGrid theme={theme}>
                    <ProductDetailsGridItem>
                      <ProductImage images={images} />
                    </ProductDetailsGridItem>
                    <ProductDetailsGridItem slideIn={true}>
                      <HeaderTextGroup firstHeading={title} secondHeading={price} />
                      <HtmlContent>{descriptionHtml}</HtmlContent>
                      <ProductForm variants={variants} />
                    </ProductDetailsGridItem>
                  </ProductDetailsGrid>
                </Section>
              </>
            );
          }

          return errorMessage;
        }}
      </Query>
    </Layout>
  );
});

export default withRouter(ProductPage);
