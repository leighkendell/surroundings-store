export interface CheckoutLineItemArg {
  variantId: string;
  quantity: number;
}

export interface Cart {
  cart: {
    isOpen: boolean;
  };
}

export interface Navigation {
  navigation: {
    isOpen: boolean;
  };
}

export interface Image {
  id: string;
  altText: string;
  transformedSrc: string;
}

export interface ImageEdge {
  node: Image;
}

export interface ImageConnection {
  edges: ImageEdge[];
}

export interface ProductVariant {
  id: string;
  image: Image;
  price: string;
  product: Product;
  title: string;
}

export interface ProductVariantEdge {
  node: ProductVariant;
}

export interface ProductVariantConnection {
  edges: ProductVariantEdge[];
}

export interface Money {
  amount: number;
  currencyCode: string;
}

export interface ProductPriceRange {
  maxVariantPrice: Money;
  minVariantPrice: Money;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  priceRange: ProductPriceRange;
  handle: string;
  tags: string[];
  images: ImageConnection;
  variants: ProductVariantConnection;
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
  completedAt: string;
  ready: boolean;
  lineItems: CheckoutLineItemConnection;
}

export interface ProductEdge {
  node: Product;
}

export interface ProductConnection {
  edges: ProductEdge[];
}

export interface Collection {
  products: ProductConnection;
}
