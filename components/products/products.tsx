import React from 'react';
import { Query } from 'react-apollo';
import { Error, Loading, ProductCards, ProductGrid, Section } from '..';
import { collectionByHandle } from '../../graphql/products';
import { Collection } from '../../interfaces';
import Wrapper from '../wrapper/wrapper';

interface Props {
  handle: string;
  limit?: number;
}

interface Data {
  collectionByHandle: Collection;
}

const errorMessage = <Error>We're having issues loading the products. Please try again later.</Error>;

const Products: React.FunctionComponent<Props> = ({ handle, limit }) => (
  <Query<Data> query={collectionByHandle} variables={{ handle, limit }}>
    {({ data, loading, error }) => {
      if (loading) {
        return <Loading />;
      }

      if (error) {
        return errorMessage;
      }

      if (data && data.collectionByHandle) {
        const products = data.collectionByHandle.products.edges;

        return (
          <Section>
            <Wrapper collapseTop={true}>
              <ProductGrid>
                <ProductCards products={products} />
              </ProductGrid>
            </Wrapper>
          </Section>
        );
      }

      return errorMessage;
    }}
  </Query>
);

Products.defaultProps = {
  limit: 6,
};

export default Products;
