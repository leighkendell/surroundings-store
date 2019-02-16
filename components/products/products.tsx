import React from 'react';
import { Query } from 'react-apollo';
import { ProductCard, ProductGrid, Section } from '..';
import getProductCards from '../../graphql/get-product-cards';
import { formatCurrency } from '../../lib/helpers';
import Wrapper from '../wrapper/wrapper';

interface Props {
  handle: string;
}

const Products: React.FunctionComponent<Props> = ({ handle }) => (
  <Query query={getProductCards} variables={{ handle }}>
    {({ data, loading, error }) => {
      if (loading) {
        return null;
      }

      if (error) {
        return null;
      }

      if (data) {
        const products = data.collectionByHandle.products.edges;

        return (
          <Section>
            <Wrapper collapseTop={true}>
              <ProductGrid>
                {products.map(({ node }) => {
                  const { id, title } = node;
                  const { amount, currencyCode } = node.priceRange.minVariantPrice;
                  const [mainImage] = node.images.edges;
                  const image = {
                    src: mainImage ? mainImage.node.transformedSrc : '',
                    alt: mainImage ? mainImage.node.altText : '',
                  };
                  const price = formatCurrency(currencyCode, amount);

                  return <ProductCard key={id} title={title} price={price} image={image} />;
                })}
              </ProductGrid>
            </Wrapper>
          </Section>
        );
      }
    }}
  </Query>
);

export default Products;
