import { ApolloClient } from 'apollo-boost';
import { createCheckout, getCheckoutId, updateCheckoutId } from '../graphql/checkout';
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

export const initCheckout = async (apolloClient: ApolloClient<{}>, reset?: boolean) => {
  // If the state of the checkout is being reset
  if (reset) {
    localStorage.removeItem('shopify-checkout-id');
    await apolloClient.mutate({
      mutation: updateCheckoutId,
      variables: { checkoutId: null },
    });
  }

  // Exit if the checkout already exists
  const checkoutIdQuery = await apolloClient.query({
    query: getCheckoutId,
  });

  if (checkoutIdQuery.data.checkoutId) {
    return;
  }

  try {
    // Get a new checkout
    const createCheckoutMutation = await apolloClient.mutate({
      mutation: createCheckout,
      variables: { input: {} },
    });

    // Set to local state and persist to localStorage
    const { checkout } = createCheckoutMutation.data.checkoutCreate;

    await apolloClient.mutate({
      mutation: updateCheckoutId,
      variables: { checkoutId: checkout.id },
    });

    localStorage.setItem('shopify-checkout-id', checkout.id);
  } catch (error) {
    throw Error(error);
  }
};
