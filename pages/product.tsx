import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
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
import { checkoutLineItemsReplace } from '../graphql/checkout';
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
            console.log(data);
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
                    <Mutation mutation={checkoutLineItemsReplace}>
                      {mutate => (
                        <Button
                          onClick={() =>
                            mutate({
                              variables: {
                                checkoutId:
                                  'Z2lkOi8vc2hvcGlmeS9DaGVja291dC8yZDM0MDhhMGIyMzI2YzYyNGMwNGZiOGY1MmVhMzFlMj9rZXk9M2Q3OWMyZGE0ZjVhYmUyMzZjOWFiNjYyZmYxMzg2NGE=',
                                lineItems: [
                                  {
                                    quantity: 1,
                                    variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xOTY1MjEwNjIyMzcwNA==',
                                  },
                                ],
                              },
                            })
                          }
                        >
                          Add to cart
                        </Button>
                      )}
                    </Mutation>
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
