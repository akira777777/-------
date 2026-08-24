import { describe, it, expect } from 'vitest';
import { PIERCINGS, ZONES } from '@/constants/piercings';
import { ZONE_PATHS } from '@/constants/svg_assets';

describe('Piercings and Zones Data', () => {
  it('should have all zones defined with correct counts', () => {
    expect(ZONES.length).toBe(3);
    for (const zone of ZONES) {
      const piercingsInZone = PIERCINGS.filter((p) => p.zone === zone.id);
      expect(piercingsInZone.length).toBe(zone.count);
    }
  });

  it('should have valid coordinates and pain levels for every piercing', () => {
    for (const piercing of PIERCINGS) {
      expect(piercing.painLevel).toBeGreaterThanOrEqual(1);
      expect(piercing.painLevel).toBeLessThanOrEqual(5);
      expect(piercing.basePrice).toBeGreaterThan(0);

      expect(piercing.hotspotCoords.x).toBeGreaterThanOrEqual(0);
      expect(piercing.hotspotCoords.x).toBeLessThanOrEqual(100);
      expect(piercing.hotspotCoords.y).toBeGreaterThanOrEqual(0);
      expect(piercing.hotspotCoords.y).toBeLessThanOrEqual(100);

      if (piercing.downsizeRecommended) {
        expect(piercing.downsizeWeeks).toBeGreaterThan(0);
      }
    }
  });

  it('should have SVG asset paths for all zones', () => {
    for (const zone of ZONES) {
      expect(ZONE_PATHS[zone.id]).toBeDefined();
      expect(ZONE_PATHS[zone.id].outline).toBeTruthy();
    }
  });
});
