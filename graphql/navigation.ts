import gql from 'graphql-tag';

export const getNavigationOpen = gql`
  query {
    navigation @client {
      isOpen
    }
  }
`;

export const updateNavigationOpen = gql`
  mutation updateNavigationOpen($isOpen: Boolean!) {
    updateNavigationOpen(isOpen: $isOpen) @client
  }
`;
