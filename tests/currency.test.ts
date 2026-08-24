import { describe, it, expect } from 'vitest';
import { CURRENCIES, formatCzk } from '@/constants/currency';

describe('Currency System', () => {
  it('should support CZK, EUR, USD with valid configs', () => {
    expect(CURRENCIES.CZK).toBeDefined();
    expect(CURRENCIES.EUR).toBeDefined();
    expect(CURRENCIES.USD).toBeDefined();

    expect(CURRENCIES.CZK.rateFromCzk).toBe(1);
    expect(CURRENCIES.EUR.rateFromCzk).toBeGreaterThan(0);
    expect(CURRENCIES.USD.rateFromCzk).toBeGreaterThan(0);
  });

  it('should format CZK correctly', () => {
    const formatted = formatCzk(1200);
    expect(formatted).toContain('1');
    expect(formatted).toContain('200');
    expect(formatted).toContain('Kč');
  });

  it('should format EUR and USD properly', () => {
    const eurFormatted = CURRENCIES.EUR.format(1000);
    expect(eurFormatted).toContain('€');

    const usdFormatted = CURRENCIES.USD.format(1000);
    expect(usdFormatted).toContain('$');
  });
});
