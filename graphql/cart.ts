import gql from 'graphql-tag';

export const getCart = gql`
  query {
    cart @client {
      isOpen
    }
  }
`;
