import gql from 'graphql-tag';

export const getCart = gql`
  {
    cart @client {
      isOpen
      isReady
    }
  }
`;
