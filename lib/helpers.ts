export const formatCurrency = (currencyCode: string, amount: number) =>
  new Intl.NumberFormat('en-au', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
