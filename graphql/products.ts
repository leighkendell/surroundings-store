import gql from 'graphql-tag';

const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    handle
    title
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    description
    descriptionHtml
    tags
    productType
  }
`;

export const productByHandle = gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFragment
      images(first: 1) {
        edges {
          node {
            id
            altText
            transformedSrc(maxWidth: 560, scale: 2, preferredContentType: PNG)
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
  ${ProductFragment}
`;

export const collectionByHandle = gql`
  query collectionByHandle($handle: String!, $limit: Int!) {
    collectionByHandle(handle: $handle) {
      products(first: $limit) {
        edges {
          node {
            ...ProductFragment
            images(first: 1) {
              edges {
                node {
                  id
                  altText
                  transformedSrc(
                    maxWidth: 400
                    scale: 2
                    preferredContentType: PNG
                  )
                }
              }
            }
          }
        }
      }
    }
  }
  ${ProductFragment}
`;
