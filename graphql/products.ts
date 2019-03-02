import gql from 'graphql-tag';

export const productByHandle = gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      description
      tags
      images(first: 1) {
        edges {
          node {
            id
            altText
            transformedSrc(maxWidth: 560, scale: 2, preferredContentType: WEBP)
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

export const collectionByHandle = gql`
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
