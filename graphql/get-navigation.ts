import gql from 'graphql-tag';

export default gql`
  {
    navigation @client {
      isOpen
    }
  }
`;
