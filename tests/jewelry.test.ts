import { describe, it, expect } from 'vitest';
import { MATERIALS, STONES, SILHOUETTES, ANODIZATION_PRESETS } from '@/constants/jewelry_types';

describe('Jewelry Types & Materials', () => {
  it('should have titanium as baseline material with multiplier 1.0', () => {
    const titanium = MATERIALS.find((m) => m.id === 'titanium');
    expect(titanium).toBeDefined();
    expect(titanium?.basePriceMultiplier).toBe(1.0);
  });

  it('should have valid stone configs with non-negative prices', () => {
    for (const stone of STONES) {
      expect(stone.price).toBeGreaterThanOrEqual(0);
      expect(stone.color).toBeTruthy();
    }
  });

  it('should have valid silhouettes with proper compatibility mappings', () => {
    expect(SILHOUETTES.length).toBeGreaterThanOrEqual(4);
    for (const sil of SILHOUETTES) {
      expect(sil.compatibleWith.length).toBeGreaterThan(0);
    }
  });

  it('should include raw titanium anodization preset with 0 price', () => {
    const raw = ANODIZATION_PRESETS.find((a) => a.id === 'raw');
    expect(raw).toBeDefined();
    expect(raw?.price).toBe(0);
  });
});
