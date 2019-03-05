export const formatCurrency = (currencyCode: string, amount: number) =>
  new Intl.NumberFormat('en-au', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);

export const getTheme = (tags: string[]) => tags.find(tag => tag.includes('theme'));

export const isBrowser = typeof window !== 'undefined';
