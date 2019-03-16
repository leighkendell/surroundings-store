import React from 'react';
import { Query } from 'react-apollo';
import { getCheckout, getCheckoutId } from '../../graphql/checkout';
import { Checkout } from '../../interfaces';

interface Data {
  node: Checkout;
}

interface Props {
  children: (data: Checkout) => React.ReactElement;
}

const CheckoutQuery: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Query<{ checkoutId: string }> query={getCheckoutId} fetchPolicy="cache-only">
      {({ data: { checkoutId } }) => {
        if (checkoutId) {
          return (
            <Query<Data> query={getCheckout} variables={{ checkoutId }}>
              {({ loading, data, error }) => {
                if (loading) {
                  return null;
                }

                if (error) {
                  return null;
                }

                if (data) {
                  return children(data.node);
                }
              }}
            </Query>
          );
        } else {
          return null;
        }
      }}
    </Query>
  );
};

export default CheckoutQuery;
