import React from 'react';
import { Query } from 'react-apollo';
import { ProductCard, ProductGrid, Section } from '..';
import { collectionByHandle } from '../../graphql/products';
import { Collection } from '../../interfaces';
import Wrapper from '../wrapper/wrapper';

interface Props {
  handle: string;
}

interface Data {
  collectionByHandle: Collection;
}

const Products: React.FunctionComponent<Props> = ({ handle }) => (
  <Query<Data> query={collectionByHandle} variables={{ handle }}>
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
                {products.map(({ node }) => (
                  <ProductCard data={node} key={node.id} />
                ))}
              </ProductGrid>
            </Wrapper>
          </Section>
        );
      }
    }}
  </Query>
);

export default Products;
