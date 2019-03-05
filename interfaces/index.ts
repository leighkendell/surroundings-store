export interface Cart {
  cart: {
    isOpen: boolean;
  };
}

export interface Image {
  id: string;
  altText: string;
  transformedSrc: string;
}

export interface ProductVariant {
  id: string;
  image: Image;
  price: string;
  product: Product;
  title: string;
}

export interface Product {
  description: string;
  handle: string;
  id: string;
  title: string;
  tags: string[];
  images: {
    edges: Image[];
  };
  variants: {
    edges: ProductVariant[];
  };
}

export interface CheckoutLineItem {
  id: string;
  quantity: number;
  title: string;
  variant: ProductVariant;
}

export interface CheckoutLineItemEdge {
  node: CheckoutLineItem;
}

export interface CheckoutLineItemConnection {
  edges: CheckoutLineItemEdge[];
}

export interface Checkout {
  id: string;
  webUrl: string;
  totalTax: string;
  totalPrice: string;
  lineItems: CheckoutLineItemConnection;
}
