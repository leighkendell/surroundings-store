import React, { useContext } from 'react';
import { animated, useTrail } from 'react-spring';
import { AppContext } from '..';
import { ProductEdge } from '../../interfaces';
import ProductCard from '../product-card/product-card';

interface Props {
  products: ProductEdge[];
}

const ProductCards: React.FunctionComponent<Props> = ({ products }) => {
  const { isServerRender } = useContext(AppContext);

  const trail = useTrail(products.length, {
    immediate: isServerRender,
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  });

  const AnimatedProductCard = animated(ProductCard);

  return (
    <>
      {trail.map((props, index) => (
        <AnimatedProductCard key={products[index].node.id} data={products[index].node} style={props} />
      ))}
    </>
  );
};

export default ProductCards;
