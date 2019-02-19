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
            const { title } = data.productByHandle;

            return (
              <>
                <HeaderText>{title}</HeaderText>
                <Section variation="secondary">
                  <Wrapper>
                    <ContentCard>
                      <Heading type="h2">Product details</Heading>
                      <Text>Natural process soft ink print with a black logo on a dark grey shirt.</Text>
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
