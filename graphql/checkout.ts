import gql from 'graphql-tag';

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    totalPrice
    lineItems(first: 250) {
      edges {
        node {
          id
          title
          quantity
          variant {
            id
            title
            image {
              altText
              transformedSrc(maxWidth: 40, scale: 2, preferredContentType: WEBP)
            }
            price
          }
        }
      }
    }
  }
`;

export const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const updateCheckout = gql`
  mutation updateCheckout($checkout: Checkout) {
    updateCheckout(checkout: $checkout) @client
  }
`;

export const getCheckout = gql`
  {
    checkout @client {
      ...CheckoutFragment
    }
  }
  ${CheckoutFragment}
`;
