import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import {
  Button,
  HeaderText,
  HeaderTextGroup,
  InputSelect,
  Layout,
  ProductDetailsGrid,
  ProductDetailsGridItem,
  ProductImage,
  Section,
  Text,
} from '../components';
import { productByHandle } from '../graphql/products';
import { formatCurrency, getTheme } from '../lib/helpers';

interface Props {
  router: SingletonRouter;
}

const ProductPage: React.FunctionComponent<Props> = ({ router }) => {
  const { handle, title: initialTitle } = router.query;

  return (
    <Layout>
      <Query query={productByHandle} variables={{ handle }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <HeaderText>{initialTitle}</HeaderText>;
          }

          if (error) {
            return null;
          }

          if (data) {
            const { title, description, images, variants, priceRange, tags } = data.productByHandle;
            const { amount, currencyCode } = priceRange.minVariantPrice;
            const price = formatCurrency(currencyCode, amount);
            const theme = getTheme(tags);

            return (
              <Section>
                <ProductDetailsGrid theme={theme}>
                  <ProductDetailsGridItem>
                    {images.edges.map(({ node }) => (
                      <ProductImage key={node.id} src={node.transformedSrc} alt={node.altText || title} />
                    ))}
                  </ProductDetailsGridItem>
                  <ProductDetailsGridItem>
                    <HeaderTextGroup firstHeading={title} secondHeading={price} />
                    <Text>{description}</Text>
                    <InputSelect>
                      {variants.edges.map(variant => (
                        <option key={variant.node.id} value={variant.node.id}>
                          {variant.node.title}
                        </option>
                      ))}
                    </InputSelect>
                    <Button>Add to cart</Button>
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
