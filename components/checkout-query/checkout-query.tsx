import React from 'react';
import { Query } from 'react-apollo';
import { getCheckout, getCheckoutId } from '../../graphql/checkout';
import { Checkout } from '../../interfaces';
import { initCheckout } from '../../lib/helpers';

interface Data {
  node: Checkout;
}

interface Props {
  children: (data: Checkout) => React.ReactElement;
}

const CheckoutQuery: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Query<{ checkoutId: string }> query={getCheckoutId}>
      {({ data: checkout, client }) => {
        if (checkout && checkout.checkoutId) {
          return (
            <Query<Data>
              query={getCheckout}
              variables={{ checkoutId: checkout.checkoutId }}
              onCompleted={({ node: { completedAt } }) => {
                // If the checkout has already been completed re-init
                if (completedAt) {
                  initCheckout(client, true);
                }
              }}
              onError={() => {
                // If there's an error with the cart re-init
                initCheckout(client, true);
              }}
            >
              {({ loading, data, error }) => {
                if (loading || error) {
                  return null;
                }

                if (data) {
                  return children(data.node);
                }

                return null;
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
