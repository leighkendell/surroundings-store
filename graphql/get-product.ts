import gql from 'graphql-tag';

export default gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      images(first: 1) {
        edges {
          node {
            id
            altText
            transformedSrc(maxWidth: 500, scale: 2, preferredContentType: WEBP)
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
          }
        }
      }
    }
  }
`;
