import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { Button, CheckoutQuery, FormField, FormGroup, Input, InputSelect, Label, Notification } from '..';
import { checkoutLineItemsReplace } from '../../graphql/checkout';
import { Checkout, ProductVariantConnection } from '../../interfaces';
import { getUpdatedLineItems } from '../../lib/helpers';

interface Props {
  variants: ProductVariantConnection;
}

interface FormSubmitParams {
  event: FormEvent;
  mutate: MutationFn;
  checkout: Checkout;
}

const ProductForm: React.FunctionComponent<Props> = ({ variants }) => {
  const [defaultVariant] = variants.edges;
  const [productVariant, updateProductVariant] = useState(defaultVariant.node.id);
  const [productQuantity, updateProductQuantity] = useState(1);
  const showSelect = variants.edges.length > 1;

  const handleVariantChange = (event: ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    updateProductVariant(target.value);
  };

  const handleQuantityChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    updateProductQuantity(parseInt(target.value, 10));
  };

  const handleFormSubmit = ({ event, mutate, checkout }: FormSubmitParams) => {
    event.preventDefault();

    const newItems = getUpdatedLineItems(checkout, productVariant, productQuantity, 'add');

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
            {(mutate, { loading }) => (
              <form onSubmit={event => handleFormSubmit({ event, mutate, checkout })}>
                <FormGroup>
                  {/* tslint:disable:react-a11y-role-has-required-aria-props */}
                  <FormField hidden={!showSelect}>
                    <Label htmlFor="variant">Colour / Size</Label>
                    <InputSelect
                      id="variant"
                      value={productVariant}
                      onChange={handleVariantChange}
                      required={true}
                      disabled={loading}
                    >
                      {variants.edges.map(variant => (
                        <option key={variant.node.id} value={variant.node.id}>
                          {variant.node.title}
                        </option>
                      ))}
                    </InputSelect>
                  </FormField>
                  <FormField>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="10"
                      step="1"
                      value={productQuantity}
                      onChange={handleQuantityChange}
                      disabled={loading}
                      required={true}
                    />
                  </FormField>
                </FormGroup>
                {/* tslint:enable */}
                <Button disabled={loading} type="submit">
                  Add to cart
                </Button>
                <Notification visible={loading}>
                  {loading ? 'Adding item to the cart...' : 'Successfully added item to the cart'}
                </Notification>
              </form>
            )}
          </Mutation>
        );
      }}
    </CheckoutQuery>
  );
};

export default ProductForm;
