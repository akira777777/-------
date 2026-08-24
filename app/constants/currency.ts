import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'CZK' | 'EUR' | 'USD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromCzk: number; // 1 CZK = X currency
  format: (amountInCzk: number) => string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  CZK: {
    code: 'CZK',
    symbol: 'Kč',
    rateFromCzk: 1,
    format: (amountInCzk: number) =>
      new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
      }).format(Math.round(amountInCzk)),
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateFromCzk: 0.040, // 1 EUR ≈ 25 CZK
    format: (amountInCzk: number) =>
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
      }).format(Math.round(amountInCzk * 0.040)),
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateFromCzk: 0.043, // 1 USD ≈ 23.2 CZK
    format: (amountInCzk: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
        maximumFractionDigits: 0,
      }).format(Math.round(amountInCzk * 0.043)),
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInCzk: number) => string;
  convertPrice: (amountInCzk: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'CZK',
  setCurrency: () => {},
  formatPrice: (amountInCzk: number) => CURRENCIES.CZK.format(amountInCzk),
  convertPrice: (amountInCzk: number) => amountInCzk,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('CZK');

  useEffect(() => {
    const saved = localStorage.getItem('aura_currency') as CurrencyCode | null;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_currency', newCurrency);
    }
  };

  const formatPrice = (amountInCzk: number) => {
    const config = CURRENCIES[currency] || CURRENCIES.CZK;
    return config.format(amountInCzk);
  };

  const convertPrice = (amountInCzk: number) => {
    const config = CURRENCIES[currency] || CURRENCIES.CZK;
    return Math.round(amountInCzk * config.rateFromCzk);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

// Backward-compatible standalone helper
export const formatCzk = (amount: number) => CURRENCIES.CZK.format(amount);
export const formatPrice = formatCzk;
