import { Checkout, CheckoutLineItemArg } from '../interfaces';

export const formatCurrency = (currencyCode: string, amount: number) =>
  new Intl.NumberFormat('en-au', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);

export const getTheme = (tags: string[]) => tags.find(tag => tag.includes('theme'));

export const isBrowser = typeof window !== 'undefined';

export const getUpdatedLineItems = (
  checkout: Checkout,
  productVariant: string,
  productQuantity: number,
  mode: 'add' | 'update' | 'remove'
) => {
  let newItems: CheckoutLineItemArg[] = [];

  // Get the current cart contents
  const currentItems: CheckoutLineItemArg[] = checkout.lineItems.edges.map(item => ({
    variantId: item.node.variant.id,
    quantity: item.node.quantity,
  }));

  // Check if the item already exists in the cart
  const existingItem = currentItems.find(item => item.variantId === productVariant);

  switch (mode) {
    case 'add':
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
      break;

    case 'update':
      if (existingItem) {
        // Update the quantity of the existing item
        const index = currentItems.indexOf(existingItem);

        // Update, remove if the quantity is 0
        if (productQuantity > 0) {
          currentItems[index].quantity = productQuantity;
          newItems = [...currentItems];
        } else {
          newItems = currentItems.filter(item => item.variantId !== existingItem.variantId);
        }
      }
      break;

    case 'remove':
      if (existingItem) {
        newItems = currentItems.filter(item => item.variantId !== existingItem.variantId);
      }
      break;
  }

  return newItems;
};
