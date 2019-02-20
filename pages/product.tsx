import { SingletonRouter, withRouter } from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import { Button, ContentCard, HeaderText, Heading, Layout, Section, Text, Wrapper } from '../components';
import getProduct from '../graphql/get-product';

interface Props {
  router: SingletonRouter;
}

const ProductPage: React.FunctionComponent<Props> = ({ router }) => {
  const { handle, title: initialTitle } = router.query;

  return (
    <Layout>
      <Query query={getProduct} variables={{ handle }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <HeaderText>{initialTitle}</HeaderText>;
          }

          if (error) {
            return null;
          }

          if (data) {
            const { title, description, images } = data.productByHandle;

            return (
              <>
                <HeaderText>{title}</HeaderText>
                <Section variation="secondary">
                  <Wrapper>
                    {images.edges.map(({ node }) => (
                      <img key={node.id} src={node.transformedSrc} alt={node.altText || title} />
                    ))}
                    <ContentCard>
                      <Heading type="h2">Product details</Heading>
                      <Text>{description}</Text>
                      <Button>Add to cart</Button>
                    </ContentCard>
                  </Wrapper>
                </Section>
              </>
            );
          }
        }}
      </Query>
    </Layout>
  );
};

export default withRouter(ProductPage);
