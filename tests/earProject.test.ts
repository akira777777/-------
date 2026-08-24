import { describe, it, expect } from 'vitest';
import { PIERCINGS } from '@/constants/piercings';

describe('Ear Curation Discount Calculation Logic', () => {
  const earPiercings = PIERCINGS.filter((p) => p.zone === 'ear');

  it('should calculate 0% discount for 1 piercing', () => {
    const selected = [earPiercings[0]];
    const subtotal = selected.reduce((sum, p) => sum + p.basePrice, 0);
    let discountPercent = 0;
    if (selected.length === 2) discountPercent = 10;
    if (selected.length >= 3) discountPercent = 15;

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const total = subtotal - discountAmount;

    expect(discountPercent).toBe(0);
    expect(total).toBe(subtotal);
  });

  it('should calculate 10% discount for 2 piercings', () => {
    const selected = [earPiercings[0], earPiercings[1]]; // 550 + 550 = 1100
    const subtotal = selected.reduce((sum, p) => sum + p.basePrice, 0);
    let discountPercent = 0;
    if (selected.length === 2) discountPercent = 10;
    if (selected.length >= 3) discountPercent = 15;

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const total = subtotal - discountAmount;

    expect(discountPercent).toBe(10);
    expect(discountAmount).toBe(110);
    expect(total).toBe(990);
  });

  it('should calculate 15% discount for 3 or more piercings and qualify for free care kit', () => {
    const selected = [earPiercings[0], earPiercings[1], earPiercings[2]]; // 550 + 550 + 650 = 1750
    const subtotal = selected.reduce((sum, p) => sum + p.basePrice, 0);
    let discountPercent = 0;
    if (selected.length === 2) discountPercent = 10;
    if (selected.length >= 3) discountPercent = 15;

    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const total = subtotal - discountAmount;
    const isFreeCareKit = selected.length >= 3;

    expect(discountPercent).toBe(15);
    expect(discountAmount).toBe(263); // round(1750 * 0.15) = 263
    expect(total).toBe(1487);
    expect(isFreeCareKit).toBe(true);
  });
});
