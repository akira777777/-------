export const formatCzk = (amount: number) =>
  new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(amount);

export const formatPrice = formatCzk;
