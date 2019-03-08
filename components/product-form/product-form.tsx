import React, { ChangeEvent, useState } from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { Button, CheckoutQuery, InputSelect } from '..';
import { checkoutLineItemsReplace } from '../../graphql/checkout';
import { Checkout, ProductVariantConnection } from '../../interfaces';

interface Props {
  variants: ProductVariantConnection;
}

interface FormSubmitParams {
  event: Event;
  mutate: MutationFn;
  checkout: Checkout;
}

const ProductForm: React.FunctionComponent<Props> = ({ variants }) => {
  const [productVariant, updateProductVariant] = useState('default');
  const [productQuantity, updateProductQuantity] = useState(1);

  const handleVariantChange = (event: ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    updateProductVariant(target.value);
  };

  const handleFormSubmit = ({ event, mutate, checkout }: FormSubmitParams) => {
    event.preventDefault();

    let newItems = [];

    // Get the current cart contents
    const currentItems = checkout.lineItems.edges.map(item => ({
      variantId: item.node.variant.id,
      quantity: item.node.quantity,
    }));

    // Check if the item already exists in the cart
    const existingItem = currentItems.find(item => item.variantId === productVariant);

    if (existingItem) {
      // If it does, just update the quantity
      const index = currentItems.indexOf(existingItem);
      currentItems[index].quantity = currentItems[index].quantity + productQuantity;
      newItems = [...currentItems];
    } else {
      // If it doesn't, add the new item
      const newItem = { variantId: productVariant, quantity: productQuantity };
      newItems = [newItem, ...currentItems];
    }

    // Update the cart
    mutate({
      variables: {
        checkoutId: checkout.id,
        lineItems: newItems,
      },
    });
  };

  return (
    <CheckoutQuery>
      {checkout => {
        return (
          <Mutation mutation={checkoutLineItemsReplace}>
            {mutate => (
              <form onSubmit={() => handleFormSubmit({ event, mutate, checkout })}>
                <InputSelect id="variant" value={productVariant} onChange={handleVariantChange} label="Size">
                  {/* tslint:disable:react-a11y-role-has-required-aria-props */}
                  <option disabled={true} value="default" />
                  {variants.edges.map(variant => (
                    <option key={variant.node.id} value={variant.node.id}>
                      {variant.node.title}
                    </option>
                  ))}
                  {/* tslint:enable */}
                </InputSelect>
                <Button>Add to cart</Button>
              </form>
            )}
          </Mutation>
        );
      }}
    </CheckoutQuery>
  );
};

export default ProductForm;
