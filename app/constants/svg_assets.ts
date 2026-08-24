import type { ZoneId } from './piercings';

// Высокоточные контуры в стиле Haute Couture Minimalist Line Art (сетка 0..100)
export const ZONE_PATHS: Record<ZoneId, { outline: string; inner: string; guides: string }> = {
  // Ухо (Ear Curation)
  ear: {
    outline: "M 40 86 C 30 86, 26 78, 28 66 C 30 54, 25 40, 26 26 C 28 10, 42 4, 60 4 C 76 4, 84 16, 84 34 C 84 52, 74 68, 62 80 C 52 86, 46 86, 40 86 Z",
    inner: "M 52 14 C 66 14, 74 22, 74 34 C 74 46, 66 56, 54 60 M 36 44 C 42 44, 46 48, 46 54 C 46 58, 42 62, 36 62 M 52 68 C 60 68, 64 62, 66 56",
    guides: "M 60 4 L 60 14 M 84 34 L 74 34 M 40 86 L 40 76"
  },
  // Лицо (Face & Nose)
  face: {
    outline: "M 30 12 C 48 10, 66 16, 72 28 C 78 38, 80 50, 76 64 C 72 78, 60 88, 48 90 C 38 92, 30 86, 26 78",
    inner: "M 48 32 Q 54 42 58 46 Q 52 50 46 50 M 42 62 Q 50 62 56 64 Q 50 70 42 68 M 32 30 Q 44 26 56 30",
    guides: "M 48 10 L 48 32 M 48 50 L 48 62"
  },
  // Тело & Ключицы (Body & Dermal)
  body: {
    outline: "M 12 28 Q 30 36 50 36 Q 70 36 88 28 M 28 32 Q 40 46 42 84 M 72 32 Q 60 46 58 84",
    inner: "M 46 72 C 46 69, 54 69, 54 72 C 54 75, 46 75, 46 72 Z M 50 36 L 50 65",
    guides: "M 12 28 L 28 32 M 88 28 L 72 32"
  }
};
