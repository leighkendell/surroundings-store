import gql from 'graphql-tag';

export default gql`
  query productByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      title
    }
  }
`;
