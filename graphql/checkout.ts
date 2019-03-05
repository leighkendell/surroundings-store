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

export const updateCheckoutId = gql`
  mutation updateCheckoutId($checkoutId: ID!) {
    updateCheckoutId(checkoutId: $checkoutId) @client
  }
`;

export const getCheckout = gql`
  query getCheckout($checkoutId: ID!, $isReady: Boolean!) {
    checkoutId @client @export(as: "checkoutId")
    cart @client {
      isOpen
    }
    node(id: $checkoutId) @include(if: $isReady) {
      ... on Checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutLineItemsReplace = gql`
  mutation checkoutLineItemsReplace($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
    checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;
