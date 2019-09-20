import React, { ChangeEvent, useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactGA from 'react-ga';
import { Image, Input } from '..';
import { checkoutLineItemsReplace } from '../../graphql/checkout';
import { Checkout, CheckoutLineItemEdge } from '../../interfaces';
import { formatCurrency, getUpdatedLineItems } from '../../lib/helpers';
import CheckoutQuery from '../checkout-query/checkout-query';
import styles from './cart-item.scss';

interface Props {
  data: CheckoutLineItemEdge;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartItem: React.FunctionComponent<Props> = React.memo(({ data, setUpdating }) => {
  const { title, variant, quantity } = data.node;
  const [productQuantity, updateProductQuantity] = useState(quantity);

  // When quantity changes
  useEffect(() => {
    setUpdating(false);
  }, [data.node.quantity]);

  // When component is unmounted
  useEffect(() => {
    return () => {
      setUpdating(false);
    };
  }, []);

  const handleQuantityChange = (event: ChangeEvent, checkout: Checkout, mutate) => {
    setUpdating(true);
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

  const handleRemove = (mutate, checkout: Checkout) => {
    setUpdating(true);

    // Update the cart
    const newItems = getUpdatedLineItems(checkout, variant.id, 0, 'remove');
    mutate({
      variables: {
        checkoutId: checkout.id,
        lineItems: newItems,
      },
    });

    // Track event
    ReactGA.event({
      category: 'Cart',
      action: 'Product Removed From Cart',
    });
  };

  return (
    <li className={styles.item}>
      <div className={styles.image}>
        <Image src={variant.image.transformedSrc} alt={variant.image.altText || 'Product image'} />
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
            <Mutation<any> mutation={checkoutLineItemsReplace}>
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
