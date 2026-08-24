export type ZoneId = 'face' | 'ear' | 'body';

export type PiercingType = {
  id: string;
  name: string;
  englishName: string;
  anatomicalLocation: string;
  description: string;
  painLevel: number; // 1-5
  initialHealingWeeks: string; // e.g. "3-4 недели" (до даунсайза)
  fullHealingMonths: string; // e.g. "6-9 месяцев" (полное созревание)
  downsizeRecommended: boolean;
  downsizeWeeks: number; // e.g. 4
  jewelryType: 'stud' | 'hoop' | 'barbell' | 'curved_bar';
  recommendedGauge: string; // e.g. "16G (1.2mm)"
  basePrice: number; // CZK
  zone: ZoneId;
  popular?: boolean;
  hotspotCoords: { x: number; y: number }; // 0..100 percentage
};

export const PIERCINGS: PiercingType[] = [
  // ================= EAR ZONE =================
  {
    id: 'e1',
    name: 'Мочка 1 (First Lobe)',
    englishName: 'First Lobe',
    anatomicalLocation: 'Нижняя часть мочки уха',
    description: 'Базовый и самый комфортный прокол. Быстро заживает, идеален для первых шагов в Ear Curation.',
    painLevel: 1,
    initialHealingWeeks: '2-3 недели',
    fullHealingMonths: '2-3 месяца',
    downsizeRecommended: false,
    downsizeWeeks: 0,
    jewelryType: 'stud',
    recommendedGauge: '18G / 16G (1.0 - 1.2mm)',
    basePrice: 550,
    zone: 'ear',
    popular: true,
    hotspotCoords: { x: 38, y: 84 }
  },
  {
    id: 'e2',
    name: 'Вторая/Третья мочка (Upper Lobes)',
    englishName: 'Upper Lobe',
    anatomicalLocation: 'Средняя и верхняя часть мочки',
    description: 'Идеально для каскадных композиций и микро-топов, гармонично продолжающих линию мочки.',
    painLevel: 1,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '2-4 месяца',
    downsizeRecommended: true,
    downsizeWeeks: 3,
    jewelryType: 'stud',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 550,
    zone: 'ear',
    popular: true,
    hotspotCoords: { x: 44, y: 74 }
  },
  {
    id: 'e3',
    name: 'Хеликс (Helix)',
    englishName: 'Helix',
    anatomicalLocation: 'Верхний наружный хрящевой завиток',
    description: 'Самый востребованный хрящевой прокол. Подходит для миниатюрных кластеров Marquise, цепочек и колец после заживления.',
    painLevel: 2,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '6-9 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 4,
    jewelryType: 'stud',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 650,
    zone: 'ear',
    popular: true,
    hotspotCoords: { x: 74, y: 22 }
  },
  {
    id: 'e4',
    name: 'Форвард Хеликс (Forward Helix)',
    englishName: 'Forward Helix',
    anatomicalLocation: 'Передний хрящ над козелком',
    description: 'Утонченный фронтальный прокол. Великолепно смотрится в соло или тройном вертикальном каскаде.',
    painLevel: 3,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '6-8 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 4,
    jewelryType: 'stud',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 700,
    zone: 'ear',
    hotspotCoords: { x: 46, y: 22 }
  },
  {
    id: 'e5',
    name: 'Конч (Conch)',
    englishName: 'Conch',
    anatomicalLocation: 'Центральная чаша ушной раковины',
    description: 'Фокусный центр любого ушного сетапа. Первично устанавливается лабрет с крупным кластером, после заживления — эффектный кликер-хуп.',
    painLevel: 3,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '6-9 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 4,
    jewelryType: 'stud',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 750,
    zone: 'ear',
    popular: true,
    hotspotCoords: { x: 58, y: 44 }
  },
  {
    id: 'e6',
    name: 'Трагус (Tragus)',
    englishName: 'Tragus',
    anatomicalLocation: 'Хрящевой выступ перед слуховым проходом',
    description: 'Элегантный акцент уха. Прекрасно гармонирует с лаконичными дисками, микро-кабошонами или бриллиантовыми топами.',
    painLevel: 2,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '4-6 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 4,
    jewelryType: 'stud',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 650,
    zone: 'ear',
    popular: true,
    hotspotCoords: { x: 38, y: 52 }
  },
  {
    id: 'e7',
    name: 'Дэйс (Daith)',
    englishName: 'Daith',
    anatomicalLocation: 'Внутренний хрящевой гребень над слуховым проходом',
    description: 'Королевский прокол в глубине уха. Сразу устанавливается кольцо/кликер с богатой инкрустацией камнями или филигранью.',
    painLevel: 3,
    initialHealingWeeks: '4-6 недель',
    fullHealingMonths: '6-10 месяцев',
    downsizeRecommended: false,
    downsizeWeeks: 0,
    jewelryType: 'hoop',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 850,
    zone: 'ear',
    popular: true,
    hotspotCoords: { x: 50, y: 38 }
  },
  {
    id: 'e8',
    name: 'Рук (Rook)',
    englishName: 'Rook',
    anatomicalLocation: 'Верхняя внутренняя складка хряща',
    description: 'Стильный вертикальный прокол с изогнутой штангой (микро-бананом) или мини-кликером.',
    painLevel: 3,
    initialHealingWeeks: '4-5 недель',
    fullHealingMonths: '6-9 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 5,
    jewelryType: 'curved_bar',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 750,
    zone: 'ear',
    hotspotCoords: { x: 52, y: 26 }
  },
  {
    id: 'e9',
    name: 'Флэт (Flat)',
    englishName: 'Flat',
    anatomicalLocation: 'Плоская зона верхнего ската уха',
    description: 'Идеальное «полотно» для выразительных крупных кластеров, лунниц, веточек и фигурных золотых топов.',
    painLevel: 2,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '6-8 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 4,
    jewelryType: 'stud',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 700,
    zone: 'ear',
    hotspotCoords: { x: 62, y: 24 }
  },

  // ================= FACE ZONE =================
  {
    id: 'f1',
    name: 'Крыло носа (Nostril)',
    englishName: 'Nostril',
    anatomicalLocation: 'Боковое крыло носа',
    description: 'Вечная классика. Для первичного прокола используется прямой лабрет с плоским диском или кристаллом, после заживления — тонкое изящное кольцо.',
    painLevel: 2,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '3-6 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 3,
    jewelryType: 'stud',
    recommendedGauge: '18G / 16G (1.0 - 1.2mm)',
    basePrice: 750,
    zone: 'face',
    popular: true,
    hotspotCoords: { x: 58, y: 46 }
  },
  {
    id: 'f2',
    name: 'Септум (Septum)',
    englishName: 'Septum',
    anatomicalLocation: 'Тонкая мембрана перегородки носа (Sweet Spot)',
    description: 'Один из самых безболезненных проколов при правильной анатомической технике. Можно легко прятать вовнутрь при необходимости.',
    painLevel: 2,
    initialHealingWeeks: '2-3 недели',
    fullHealingMonths: '2-3 месяца',
    downsizeRecommended: false,
    downsizeWeeks: 0,
    jewelryType: 'hoop',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 850,
    zone: 'face',
    popular: true,
    hotspotCoords: { x: 49, y: 53 }
  },
  {
    id: 'f3',
    name: 'Медуза / Филтрум (Medusa)',
    englishName: 'Medusa / Philtrum',
    anatomicalLocation: 'Центральная ямочка над верхней губой',
    description: 'Симметричный чувственный акцент в центре лица. Идеально сочетается с кристаллами Swarovski и опалами.',
    painLevel: 3,
    initialHealingWeeks: '2-3 недели',
    fullHealingMonths: '2-4 месяца',
    downsizeRecommended: true,
    downsizeWeeks: 3,
    jewelryType: 'stud',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 850,
    zone: 'face',
    hotspotCoords: { x: 49, y: 64 }
  },
  {
    id: 'f4',
    name: 'Вертикальный Лабрет (Vertical Labret)',
    englishName: 'Vertical Labret',
    anatomicalLocation: 'Нижняя губа по вертикали',
    description: 'Эффектный прокол, не контактирующий с зубами и деснами. Оформляется микро-бананом с двумя сияющими накрутками.',
    painLevel: 3,
    initialHealingWeeks: '3-4 недели',
    fullHealingMonths: '2-3 месяца',
    downsizeRecommended: true,
    downsizeWeeks: 3,
    jewelryType: 'curved_bar',
    recommendedGauge: '16G (1.2mm)',
    basePrice: 850,
    zone: 'face',
    hotspotCoords: { x: 49, y: 76 }
  },
  {
    id: 'f5',
    name: 'Скуловой Микродермал (Cheek Dermal)',
    englishName: 'Cheek Dermal',
    anatomicalLocation: 'Скуловая дуга / окологлазничная зона',
    description: 'Имплантация титанового якоря под кожу с поверхностной сменной накруткой. Требует филигранной хирургической техники.',
    painLevel: 3,
    initialHealingWeeks: '4-6 недель',
    fullHealingMonths: '3-5 месяцев',
    downsizeRecommended: false,
    downsizeWeeks: 0,
    jewelryType: 'stud',
    recommendedGauge: '14G (1.6mm Base)',
    basePrice: 1100,
    zone: 'face',
    hotspotCoords: { x: 70, y: 38 }
  },

  // ================= BODY ZONE =================
  {
    id: 'b1',
    name: 'Пупок классический (Navel)',
    englishName: 'Navel',
    anatomicalLocation: 'Верхняя складка пупка',
    description: 'Анатомический прокол с изогнутым бананом. Подбирается строго под форму складки в положениях стоя и сидя.',
    painLevel: 3,
    initialHealingWeeks: '4-6 недель',
    fullHealingMonths: '6-9 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 4,
    jewelryType: 'curved_bar',
    recommendedGauge: '14G (1.6mm)',
    basePrice: 900,
    zone: 'body',
    popular: true,
    hotspotCoords: { x: 50, y: 72 }
  },
  {
    id: 'b2',
    name: 'Микродермал в ключице (Clavicle Dermal)',
    englishName: 'Clavicle Dermal',
    anatomicalLocation: 'Яремная впадина или надключичная зона',
    description: 'Изысканный акцент в декольте. Сияющий кристалл или золотой диск, парящий на коже.',
    painLevel: 3,
    initialHealingWeeks: '4-6 недель',
    fullHealingMonths: '3-5 месяцев',
    downsizeRecommended: false,
    downsizeWeeks: 0,
    jewelryType: 'stud',
    recommendedGauge: '14G (1.6mm Base)',
    basePrice: 1200,
    zone: 'body',
    popular: true,
    hotspotCoords: { x: 26, y: 30 }
  },
  {
    id: 'b3',
    name: 'Флоатинг пупок (Floating Navel)',
    englishName: 'Floating Navel',
    anatomicalLocation: 'Для анатомии с «захлопывающимся» пупком',
    description: 'Специальная модификация для глубоких или закрывающихся пупков: плоский диск снизу предотвращает давление и травматизацию.',
    painLevel: 3,
    initialHealingWeeks: '4-6 недель',
    fullHealingMonths: '6-9 месяцев',
    downsizeRecommended: true,
    downsizeWeeks: 4,
    jewelryType: 'curved_bar',
    recommendedGauge: '14G (1.6mm)',
    basePrice: 950,
    zone: 'body',
    hotspotCoords: { x: 50, y: 64 }
  }
];

export const ZONES: { id: ZoneId; name: string; icon: string; count: number; desc: string }[] = [
  { id: 'ear', name: 'Уши (Ear Curation)', icon: '👂', count: 9, desc: 'Мочки, хрящи, конч, дэйс и каскадные композиции' },
  { id: 'face', name: 'Лицо (Face & Nose)', icon: '👤', count: 5, desc: 'Ноздри, септум, губы и микродермалы' },
  { id: 'body', name: 'Тело (Body Anatomy)', icon: '✨', count: 3, desc: 'Пупок, флоатинг-сетапы и ключичные дермалы' }
];
