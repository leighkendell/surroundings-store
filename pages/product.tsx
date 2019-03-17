import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import {
  Error,
  HeaderTextGroup,
  Layout,
  Loading,
  ProductDetailsGrid,
  ProductDetailsGridItem,
  ProductForm,
  ProductImage,
  Section,
  Text,
} from '../components';
import { productByHandle } from '../graphql/products';
import { Product as ProductInterface } from '../interfaces';
import { formatCurrency, getTheme } from '../lib/helpers';

interface Props {
  router: SingletonRouter;
}

interface Data {
  productByHandle: ProductInterface;
}

const ProductPage: React.FunctionComponent<Props> = ({ router }) => {
  const { handle } = router.query;

  return (
    <Layout>
      <Query<Data> query={productByHandle} variables={{ handle }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />;
          }

          if (error) {
            return <Error>We're having issues loading this product. Please try again later.</Error>;
          }

          if (data) {
            const product = data.productByHandle;
            const { title, description, images, variants, priceRange, tags } = product;
            const { amount, currencyCode } = priceRange.minVariantPrice;
            const price = formatCurrency(currencyCode, amount);
            const theme = getTheme(tags);

            return (
              <Section>
                <ProductDetailsGrid theme={theme}>
                  <ProductDetailsGridItem>
                    <ProductImage images={images} />
                  </ProductDetailsGridItem>
                  <ProductDetailsGridItem>
                    <HeaderTextGroup firstHeading={title} secondHeading={price} />
                    <Text>{description}</Text>
                    <ProductForm variants={variants} />
                  </ProductDetailsGridItem>
                </ProductDetailsGrid>
              </Section>
            );
          }
        }}
      </Query>
    </Layout>
  );
};

export default withRouter(ProductPage);
