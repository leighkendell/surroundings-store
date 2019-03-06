import React from 'react';
import { Button, InputSelect } from '..';
import { ProductVariantConnection } from '../../interfaces';

interface Props {
  variants: ProductVariantConnection;
}

const ProductForm: React.FunctionComponent<Props> = ({ variants }) => (
  <form onSubmit={() => console.log('woop')}>
    <InputSelect>
      {/* tslint:disable:react-a11y-role-has-required-aria-props */}
      {variants.edges.map(variant => (
        <option key={variant.node.id} value={variant.node.id}>
          {variant.node.title}
        </option>
      ))}
      {/* tslint:enable */}
    </InputSelect>
    <Button>Add to cart</Button>
  </form>
);

export default ProductForm;
