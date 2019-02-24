import gql from 'graphql-tag';

export default gql`
  query collectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      products(first: 6) {
        edges {
          node {
            handle
            id
            title
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  altText
                  transformedSrc(maxWidth: 400, scale: 2, preferredContentType: WEBP)
                }
              }
            }
          }
        }
      }
    }
  }
`;
