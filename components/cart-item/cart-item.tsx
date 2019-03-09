import React, { ChangeEvent, useEffect, useState } from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { Input } from '..';
import { checkoutLineItemsReplace } from '../../graphql/checkout';
import { Checkout, CheckoutLineItemEdge } from '../../interfaces';
import { formatCurrency, getUpdatedLineItems } from '../../lib/helpers';
import CheckoutQuery from '../checkout-query/checkout-query';
import styles from './cart-item.scss';

interface Props {
  data: CheckoutLineItemEdge;
}

const CartItem: React.FunctionComponent<Props> = React.memo(({ data }) => {
  const { title, variant, quantity } = data.node;
  const [productQuantity, updateProductQuantity] = useState(quantity);

  const handleQuantityChange = (event: ChangeEvent, checkout: Checkout, mutate: MutationFn) => {
    const target = event.target as HTMLInputElement;
    const newQuantity = parseInt(target.value, 10);

    // Update state
    updateProductQuantity(newQuantity);

    // Update the cart
    const newItems = getUpdatedLineItems(checkout, variant.id, newQuantity, 'update');
    mutate({
      variables: {
        checkoutId: checkout.id,
        lineItems: newItems,
      },
    });
  };

  const handleRemove = (mutate: MutationFn, checkout: Checkout) => {
    // Update the cart
    const newItems = getUpdatedLineItems(checkout, variant.id, 0, 'remove');
    mutate({
      variables: {
        checkoutId: checkout.id,
        lineItems: newItems,
      },
    });
  };

  return (
    <li className={styles.item}>
      <div className={styles.image}>
        <img src={variant.image.transformedSrc} alt={variant.image.altText} />
      </div>
      <div className={styles.details}>
        <span>{title}</span>
        <span>
          {variant.title}, {formatCurrency('AUD', parseFloat(variant.price))}
        </span>
      </div>
      <div className={styles.manage}>
        <CheckoutQuery>
          {checkout => (
            <Mutation mutation={checkoutLineItemsReplace}>
              {(mutate, { loading }) => (
                <>
                  <Input
                    type="number"
                    value={productQuantity}
                    aria-label="Quantity"
                    onChange={event => handleQuantityChange(event, checkout, mutate)}
                    disabled={loading}
                  />
                  <button className={styles.button} onClick={() => handleRemove(mutate, checkout)} disabled={loading}>
                    Remove
                  </button>
                </>
              )}
            </Mutation>
          )}
        </CheckoutQuery>
      </div>
    </li>
  );
});

export default CartItem;
