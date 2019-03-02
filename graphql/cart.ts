import gql from 'graphql-tag';

export const getCart = gql`
  query {
    cart @client {
      isOpen
    }
  }
`;

export const updateCartOpen = gql`
  mutation updateCartOpen($isOpen: Boolean!) {
    updateCartOpen(isOpen: $isOpen) @client
  }
`;
