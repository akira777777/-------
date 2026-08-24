export type ZoneId = 'face' | 'ear' | 'body';

export type PiercingType = {
  id: string;
  name: string;
  description: string;
  painLevel: number; // 1-5
  jewelryType: 'stud' | 'hoop' | 'barbell' | 'curved_bar';
  basePrice: number;
  zone: ZoneId;
};

export const PIERCINGS: PiercingType[] = [
  // Face Zone
  {
    id: 'f1',
    name: 'Носовое крыло (Nostril)',
    description: 'Классический прокол в крыле носа. Идеально подходит для тонких колец или маленьких пусет.',
    painLevel: 2,
    jewelryType: 'hoop',
    basePrice: 750,
    zone: 'face'
  },
  {
    id: 'f2',
    name: 'Септум (Septum)',
    description: 'Прокол в перегородке носа. Популярный выбор для кликеров, колец и декоративных элементов.',
    painLevel: 3,
    jewelryType: 'hoop',
    basePrice: 850,
    zone: 'face'
  },
  {
    id: 'f3',
    name: 'Микродермал (Dermal)',
    description: 'Имплантационный прокол под кожей. Требует высокой квалификации мастера.',
    painLevel: 4,
    jewelryType: 'stud',
    basePrice: 1100,
    zone: 'face'
  },
  // Ear Zone
  {
    id: 'e1',
    name: 'Хеликс (Helix)',
    description: 'Прокол верхнего хряща ушной раковины. Популярно для создания каскадных композиций.',
    painLevel: 2,
    jewelryType: 'curved_bar',
    basePrice: 650,
    zone: 'ear'
  },
  {
    id: 'e2',
    name: 'Трагус (Tragus)',
    description: 'Прокол козелка ушной раковины. Идеально для миниатюрных кристаллов и пусет.',
    painLevel: 3,
    jewelryType: 'stud',
    basePrice: 650,
    zone: 'ear'
  },
  {
    id: 'e3',
    name: 'Конч (Conch)',
    description: 'Прокол центральной раковины уха. Подходит для крупных колец и кластеров.',
    painLevel: 3,
    jewelryType: 'hoop',
    basePrice: 750,
    zone: 'ear'
  },
  // Body Zone
  {
    id: 'b1',
    name: 'Пупок (Navel)',
    description: 'Классический анатомический прокол пупка с изогнутым бананом или подвеской.',
    painLevel: 3,
    jewelryType: 'barbell',
    basePrice: 900,
    zone: 'body'
  },
  {
    id: 'b2',
    name: 'Ключица (Body Dermal)',
    description: 'Имплантационный микродермал в зоне ключицы или яремной впадины.',
    painLevel: 4,
    jewelryType: 'stud',
    basePrice: 1200,
    zone: 'body'
  }
];

export const ZONES: { id: ZoneId; name: string; icon: string }[] = [
  { id: 'face', name: 'Лицо', icon: '👤' },
  { id: 'ear', name: 'Уши', icon: '👂' },
  { id: 'body', name: 'Тело', icon: '✨' }
];
