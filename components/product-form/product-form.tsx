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
  const [productQuantity, updateProductQuantity] = useState('');

  const handleVariantChange = (event: ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    updateProductVariant(target.value);
  };

  const handleFormSubmit = ({ event, mutate, checkout }: FormSubmitParams) => {
    event.preventDefault();
    mutate({
      variables: {
        checkoutId: checkout.id,
        lineItems: [
          {
            variantId: productVariant,
            quantity: 1,
          },
        ],
      },
    });

    console.log(productVariant);
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
