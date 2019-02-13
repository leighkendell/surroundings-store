import gql from 'graphql-tag';

export default gql`
  mutation updateNavigation($isOpen: Boolean) {
    updateNavigation(isOpen: $isOpen) @client
  }
`;
