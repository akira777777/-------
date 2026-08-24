export type Material = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  basePriceMultiplier: number;
  color: string;
  gradient: string;
  borderGlow: string;
  purityBadge: string;
};

export type Stone = {
  id: string;
  name: string;
  price: number; // CZK
  color: string;
  gradient: string;
  glow: string;
  sparkleHex: string;
  isIridescent?: boolean;
};

export type SilhouetteType = 'labret_stud' | 'marquise_fan' | 'eternity_hoop' | 'curved_bar' | 'cluster_trio';

export interface SilhouetteConfig {
  id: SilhouetteType;
  name: string;
  description: string;
  compatibleWith: ('stud' | 'hoop' | 'barbell' | 'curved_bar')[];
}

export const SILHOUETTES: SilhouetteConfig[] = [
  {
    id: 'labret_stud',
    name: 'Push-Pin Labret с топом',
    description: 'Лаконичный плоский диск или круглый крапановый кабошон. Максимум комфорта при сне.',
    compatibleWith: ['stud'],
  },
  {
    id: 'marquise_fan',
    name: 'Веер Marquise Fan Cluster',
    description: 'Каскадный веер из ограненных камней "Маркиз". Роскошный акцент для хеликса и флэта.',
    compatibleWith: ['stud'],
  },
  {
    id: 'cluster_trio',
    name: 'Кластер Trinity (Тринити)',
    description: 'Треугольное созвездие из трех кристаллов. Универсально для мочки, трагуса и носа.',
    compatibleWith: ['stud'],
  },
  {
    id: 'eternity_hoop',
    name: 'Clicker Ring (Кликер-кольцо)',
    description: 'Бесшовное кольцо с надежным замком-клик и дорожкой сияющих камней.',
    compatibleWith: ['hoop'],
  },
  {
    id: 'curved_bar',
    name: 'Микро-банан Curved Barbell',
    description: 'Изогнутая основа с двойными сияющими накрутками для пупка, руука и губ.',
    compatibleWith: ['curved_bar', 'barbell'],
  },
];

export const MATERIALS: Material[] = [
  {
    id: 'titanium',
    name: 'Имплантационный титан ASTM F-136',
    shortName: 'Титан F-136',
    description: 'Биосовместимый сплав Ti-6Al-4V ELI высшей чистоты. Полная гипоаллергенность, 0% никеля.',
    basePriceMultiplier: 1.0,
    color: '#B0B5BA',
    gradient: 'linear-gradient(135deg, #E2E8F0 0%, #94A3B8 50%, #475569 100%)',
    borderGlow: 'rgba(148, 163, 184, 0.4)',
    purityBadge: 'Ti-6Al-4V ELI',
  },
  {
    id: 'gold_14k_rose',
    name: 'Розовое Золото 14K (Rose Gold)',
    shortName: 'Золото 14K Rose',
    description: 'Благородный теплый сплав из сертифицированного бессвинцового золота без никеля.',
    basePriceMultiplier: 2.2,
    color: '#E0A98B',
    gradient: 'linear-gradient(135deg, #FFE4D6 0%, #E0A98B 50%, #B87355 100%)',
    borderGlow: 'rgba(224, 169, 139, 0.4)',
    purityBadge: '14 Karat Solid',
  },
  {
    id: 'gold_18k_yellow',
    name: 'Желтое Золото 18K (Solid Gold)',
    shortName: 'Золото 18K Yellow',
    description: 'Премиальный золотой сплав 750 пробы с глубоким аутентичным сиянием.',
    basePriceMultiplier: 3.0,
    color: '#D4AF37',
    gradient: 'linear-gradient(135deg, #FFF6D1 0%, #F59E0B 50%, #B45309 100%)',
    borderGlow: 'rgba(212, 175, 55, 0.5)',
    purityBadge: '18 Karat 750',
  },
  {
    id: 'platinum_950',
    name: 'Платина 950 (Platinum)',
    shortName: 'Платина 950',
    description: 'Самый плотный, износостойкий и вечный ювелирный металл на планете.',
    basePriceMultiplier: 4.0,
    color: '#E5E4E2',
    gradient: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #64748B 100%)',
    borderGlow: 'rgba(255, 255, 255, 0.5)',
    purityBadge: 'Pt 950 Pure',
  },
];

export const STONES: Stone[] = [
  {
    id: 'none',
    name: 'Гладкий полированный металл',
    price: 0,
    color: 'transparent',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
    glow: 'rgba(255, 255, 255, 0.1)',
    sparkleHex: '#FFFFFF',
  },
  {
    id: 'diamond',
    name: 'Бриллиант / Swarovski CZ (D-Color)',
    price: 1600,
    color: '#FFFFFF',
    gradient: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)',
    glow: 'rgba(255, 255, 255, 0.8)',
    sparkleHex: '#FFFFFF',
  },
  {
    id: 'opal_aurora',
    name: 'Опал Aurora Borealis (Радужный)',
    price: 1200,
    color: '#E0F2FE',
    gradient: 'linear-gradient(135deg, #E0F2FE 0%, #FBCFE8 35%, #BAE6FD 70%, #FEF08A 100%)',
    glow: 'rgba(0, 242, 254, 0.7)',
    sparkleHex: '#00F2FE',
    isIridescent: true,
  },
  {
    id: 'sapphire_royal',
    name: 'Королевский Сапфир (Royal Blue)',
    price: 1300,
    color: '#1D4ED8',
    gradient: 'radial-gradient(circle at 30% 30%, #60A5FA 0%, #1D4ED8 60%, #0F172A 100%)',
    glow: 'rgba(29, 78, 216, 0.7)',
    sparkleHex: '#60A5FA',
  },
  {
    id: 'emerald_colombian',
    name: 'Изумруд гидротермальный (Lush Green)',
    price: 1450,
    color: '#10B981',
    gradient: 'radial-gradient(circle at 30% 30%, #6EE7B7 0%, #059669 60%, #064E3B 100%)',
    glow: 'rgba(16, 185, 129, 0.7)',
    sparkleHex: '#34D399',
  },
  {
    id: 'ruby_burma',
    name: 'Рубин кабошон (Vivid Crimson)',
    price: 1350,
    color: '#E11D48',
    gradient: 'radial-gradient(circle at 30% 30%, #FDA4AF 0%, #E11D48 60%, #4C0519 100%)',
    glow: 'rgba(225, 29, 72, 0.7)',
    sparkleHex: '#FB7185',
  },
  {
    id: 'black_onyx',
    name: 'Черный Оникс глянец (Deep Black)',
    price: 900,
    color: '#0F172A',
    gradient: 'radial-gradient(circle at 30% 30%, #475569 0%, #0F172A 70%, #020617 100%)',
    glow: 'rgba(15, 23, 42, 0.5)',
    sparkleHex: '#94A3B8',
  },
];

export const ANODIZATION_PRESETS = [
  { id: 'raw', name: 'Натуральный титан (Silver Ice)', colorHex: '#B0B5BA', price: 0 },
  { id: 'champagne', name: 'Шампань (Champagne Gold)', colorHex: '#E5D3B3', price: 150 },
  { id: 'gold_24k', name: 'Золотистый (24K Gold tone)', colorHex: '#EAB308', price: 150 },
  { id: 'rose', name: 'Розовый (Rose Bronze)', colorHex: '#E0A98B', price: 150 },
  { id: 'ice_blue', name: 'Ледяной голубой (Ice Blue)', colorHex: '#38BDF8', price: 150 },
  { id: 'teal', name: 'Морская волна (Teal Green)', colorHex: '#14B8A6', price: 150 },
  { id: 'violet', name: 'Глубокий фиолет (Deep Violet)', colorHex: '#A855F7', price: 150 },
];
