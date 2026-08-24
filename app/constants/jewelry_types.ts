export type Material = {
  id: string;
  name: string;
  description: string;
  basePriceMultiplier: number; // Multiplier for the piercing base price
  color: string;
};

export type Stone = {
  id: string;
  name: string;
  price: number;
  color: string;
};

export const MATERIALS: Material[] = [
  {
    id: 'titanium',
    name: 'Имплантационный титан',
    description: 'Гипоаллергенный металл высшей чистоты (ASTM F-136). Идеален для первичных проколов.',
    basePriceMultiplier: 1.0,
    color: '#A9A9A9'
  },
  {
    id: 'gold_14k',
    name: 'Золото 14K',
    description: 'Классическое золото с высокой прочностью и благородным блеском.',
    basePriceMultiplier: 2.5,
    color: '#E0A98B'
  },
  {
    id: 'gold_18k',
    name: 'Золото 18K',
    description: 'Премиальное золото с повышенным содержанием чистого металла.',
    basePriceMultiplier: 3.5,
    color: '#D4AF37'
  },
  {
    id: 'platinum',
    name: 'Платина',
    description: 'Самый редкий и долговечный металл для эксклюзивных украшений.',
    basePriceMultiplier: 5.0,
    color: '#E5E4E2'
  }
];

export const STONES: Stone[] = [
  { id: 'none', name: 'Без камня', price: 0, color: 'transparent' },
  { id: 'diamond', name: 'Бриллиант', price: 2400, color: '#FFFFFF' },
  { id: 'sapphire', name: 'Сапфир', price: 1200, color: '#0F52BA' },
  { id: 'ruby', name: 'Рубин', price: 1450, color: '#E0115F' },
  { id: 'emerald', name: 'Изумруд', price: 1750, color: '#50C878' }
];
